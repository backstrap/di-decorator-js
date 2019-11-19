
/**
 * The registry of injectable services.
 * @extends Map
 */
export class Registry extends Map
{
    constructor() {
        super();
        this.cache = new Map();
    }

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
            const inherited = this.get(superName) || [];

            if (services.length > inherited.length) {
                throw new Error(`Dependency count for ${target.name} should be ${inherited.length}`);
            } else {
                services = services.concat(inherited.slice(services.length));
            }
        }

        this.set(target.name, services);
        target.isInjectable = true;
    }

    /**
     * Resolve dependencies
     * @param {Function} target - The class of the service to be resolved.
     * @param {boolean} [target.isInjectable] - True if the target has been registered.
     * @returns {Object} - An instance of the target class.
     */
    resolve(target) {
        if (!target.isInjectable) {
            throw new Error(`Target is not injectable for ${target.name}`);
        }

        return this.cache.get(target.name) || this.cache.set(
            target.name,
            new target(...(this.get(target.name)).map(service => this.resolve(service)))
        ).get(target.name);
    }
}
