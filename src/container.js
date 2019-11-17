
import {Registry} from './Registry';

const registry = new Registry();

/**
 * @callback injectionCallback
 * @param {function} target
 */
/**
 * @namespace
 * @property {function} injectable
 * @property {function} resolve
 */
export const container = {
    /**
     * Dependency injection decorator.
     * @param {...function} services
     * @returns {injectionCallback}
     */
    injectable: (...services) => (target => registry.register(target, services)),
    /**
     * Inversion-of-control resolver.
     * @param {function} target
     * @returns {object}
     */
    resolve: (target) => registry.resolve(target),
};
