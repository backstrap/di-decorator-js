
import {Registry} from './Registry';

const registry = new Registry();

/**
 * @callback injectionCallback
 * @param {Function} target
 */
/**
 * @namespace
 * @property {Function} injectable
 * @property {Function} resolve
 */
export const container = {
    /**
     * Dependency injection decorator.
     * @param {...function} services - The injectable classes the target class depends on.
     * @returns {injectionCallback} - The registration function for the target class.
     */
    injectable: (...services) => (target => registry.register(target, services)),
    /**
     * Inversion-of-control resolver.
     * @param {Function} target - The class of the service to be resolved.
     * @returns {Object} - An instance of the target class.
     */
    resolve: (target) => registry.resolve(target),
};
