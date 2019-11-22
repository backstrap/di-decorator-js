
const leadingCapsExpr = /^\p{Lu}+/u;

/**
 * The registry of injectable services.
 * @extends Map
 */
export class Registry extends Map
{
    /**
     * Register dependencies
     * @param {Function} target - The injectable class to be registered.
     * @param {boolean} [target.isInjectable] - True if the target has been registered.
     * @param {function[]} services - The injectable classes the target depends on.
     */
    register(target, services) {
        // We must allow for injecting into an inherited constructor - target.length will be 0.
        if (target.length > 0 && services.length !== target.length) {
            throw new Error(`Dependency count for ${target.name} should be ${target.length}`);
        } else if (target.length === 0) {
            const superName = Object.getPrototypeOf(target.prototype).constructor.name;
            const inherited = (this.get(superName) && this.get(superName).services) || [];

            // We must inject at least the dependencies that our superclass is expecting.
            if (services.length < inherited.length) {
                throw new Error(`Dependency count for ${target.name} should be at least ${inherited.length}`);
            } else {
                services.forEach((service, index) => {
                    if (inherited[index] && service !== inherited[index] && !(service.prototype instanceof inherited[index])) {
                        throw new Error(`Dependency mis-match for ${target.name} at ${service.name}`)
                    }
                });
                services = services.concat(inherited.slice(services.length));
            }
        }

        /*
         * We must ensure that we are not re-using a name that a superclass of ours is using.
         * For example if B extends A, and D extends C,
         * and we declare D to be @autoinjectable(A)
         * then it is illegal to declare C to be @autoinjectable(B, A),
         * because this.a will have conflicting meanings -
         * methods of D will expect this.a to be the instance of B (which is legal),
         * but methods of C will expect this.a to be an independent plain A instance, not B.
         */
        const names = services.map(service => this.makeName(service));
        let parent = Object.getPrototypeOf(target.prototype).constructor;
        let entry = this.get(parent.name);

        while (entry && entry.names.length) {
            if (names.some(
                (name, index) => entry.names.some((comp, compIndex) => (comp === name && compIndex !== index))
            )) {
                throw new Error(`injection conflict! Re-use of "${parent.name}" injection in "${target.name}"`);
            }

            parent = Object.getPrototypeOf(parent.prototype);
            entry = this.get(parent.name);
        }

        this.set(target.name, {
            services: services,
            names: names,
        });
        target.isInjectable = true;
    }

    autoInject(target, services) {
        this.register(target, services);

        const names = this.get(target.name).names;
        const autoInjected = class extends target {
            constructor(...args) {
                super(...args);
                names.forEach((name, index) => this[name] = args[index]);
            }
        };
        Object.defineProperty(autoInjected, 'name', {value: target.name});

        return autoInjected;
    }

    /**
     * Resolve dependencies
     * @param {Function} target - The class of the service to be resolved.
     * @param {boolean} [target.isInjectable] - True if the target has been registered.
     * @returns {Object} - An instance of the target class.
     */
    resolve(target) {
        const data = this.get(target.name);

        if (!target.isInjectable) {
            throw new Error(`Target is not injectable for ${target.name}`);
        }

        return data.instance || (data.instance = new target(...(data.services).map(service => this.resolve(service))));
    }

    /**
     * Makes a camelCase property name for a service class.
     * @protected
     * @param {Function} service - The class of the service.
     * @return {string} - The name to use for properties holding an instance of this service.
     */
    makeName(service) {
        const name = service.name;
        const modCount = (leadingCapsExpr.exec(name)[0].length - 1) || 1;

        return (
            modCount === name.length - 1
            ? name.toLowerCase()
            : name.substring(0, modCount).toLowerCase() + name.substring(modCount)
        );
    }
}
