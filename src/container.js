
import {Registry}   from './Registry';

const registry = new Registry();

/**
 * @callback decoratorCallback
 * @param {Function} target
 */
/**
 * @namespace
 * @property {Function} injectable
 * @property {Function} autoInject
 * @property {Function} resolve
 */
export const container = {
    /**
     * Dependency injection decorator.
     * @param {...function} services - The injectable classes the target class depends on.
     * @returns {decoratorCallback} - The registration function for the target class.
     */
    injectable: (...services) => (target => registry.register(target, services)),

    /**
     * Automatic injection decorator.
     * @param {...function} services - The injectable classes the target class depends on.
     * @returns {decoratorCallback} - The autoInjection function for the target class.
     */
    autoinjectable: (...services) => (target => registry.autoInject(target, services)),

    /**
     * Inversion-of-control resolver.
     * @param {Function} target - The class of the service to be resolved.
     * @returns {Object} - An instance of the target class.
     */
    resolve: (target) => registry.resolve(target),
};
