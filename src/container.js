


class Container {

    constructor() {
        this._registry = new Map();
    }

    /**
     * Register dependencies
     * @param {Object} target 
     * @param {Function[]} providers 
     */
    registry(target, providers) {

        if (!this.isInjectable(target, providers)) {
            throw new Error(`Provider is required in ${providers}`);
        }

        providers && providers.length > 0 ?
            this._registry.set(target.name, providers) :
            this._registry.set(target.name, target);
        return this;
    }

    /**
     * 
     * @param {Object} target 
     * @returns {Function[]|boolean}
     */
    getRegistration(target) {
        if (this.isRegistered(target.name)) {
            return this._registry.get(target.name);
        }
        return false;
    }


    /**
   * Check if the given dependency is registered
   * @param {string} token - target name
   * @return {boolean}
   */
    isRegistered(token) {
        return this._registry.has(token);
    }

    isInjectable(target, providers) {
        return !(target.length === 1 && (!providers || providers.length === 0));
    }


    /**
     * @typedef {Object} Instance
     */

    /**
     * Resolve dependencies
     * @param {object} target
     * @returns {Instance}
     */
    resolve(target) {
        return this.construct(target);
    }


    construct(ctor) {
        if (ctor.length === 0) {
            return new ctor();
        }

        const injects = this.getRegistration(ctor);


        if (!injects || injects.length === 0) {
            throw new Error(`Inject not known for ${ctor}`);
        }

        const params = injects.map(param => this.resolve(param));

        return new ctor(...params);
    }

}

export const IoC = new Container();


