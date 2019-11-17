
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
     * @param {...function} services
     * @returns {injectionCallback}
     */
    injectable: (...services) => (target => registry.register(target, services)),
    /**
     * Inversion-of-control resolver.
     * @param {Function} target
     * @returns {Object}
     */
    resolve: (target) => registry.resolve(target),
};
