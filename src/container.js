
import {Registry} from './Registry';

const registry = new Registry();

export const container = {
    /**
     * Dependency injection decorator.
     * @param {...function} services
     * @returns {function<function>}
     */
    injectable: (...services) => (target => registry.register(target, services)),
    /**
     * Inversion-of-control resolver.
     * @param {function} target
     * @returns {object}
     */
    resolve: (target) => registry.resolve(target),
};
