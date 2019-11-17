
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
     * @param {Function} target
     * @param {boolean} [target.isInjectable]
     * @param {function[]} services
     */
    register(target, services) {
        if (target.length !== services.length) {
            throw new Error(`Dependency count for ${target.name} should be ${target.length}`);
        }

        this.set(target.name, services);
        target.isInjectable = true;
    }

    /**
     * Resolve dependencies
     * @param {Function} target
     * @param {boolean} [target.isInjectable]
     * @returns {Object}
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
