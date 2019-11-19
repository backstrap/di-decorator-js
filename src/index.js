'use strict';

const container = require('./container').container;

/**
 * A simple dependency injection module.
 * Use the "injectable" decorator to mark your injectable service providers,
 * then use the "resolve" function to acquire the fully resolved top-level service object.
 *
 * @example 
 * import {injectable} from 'effortless-di';
 * import {resolve}    from 'effortless-di';
 * &#64;injectable(Service1, ...)
 * class Application { constructor(service1, ...) { ... }, run() { ... } }
 * resolve(Application).run();
 * @example
 * import DI from 'effortless-di';
 * &#64;DI.injectable(Service1, ...)
 * class Application { constructor(service1, ...) { ... }, run() { ... } }
 * DI.resolve(Application).run();
 * @namespace
 * @property {Function} injectable - The dependency injection decorator function.
 * @property {Function} resolve - The service class resolver function.
 * @property {Object}   DI - A DI namespace containing the injectable() and resolve() functions.
 */
module.exports = {
    injectable: container.injectable,
    resolve: container.resolve,
    DI: container
};
