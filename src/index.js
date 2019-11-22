'use strict';

import {container} from './container';

/**
 * A simple dependency injection module.
 * Use the "injectable" decorator to mark your injectable service providers,
 * then use the "resolve" function to acquire the fully resolved top-level service object.
 * If your service provider extends AutoInject, then it does not need a constructor -
 * it can use "Constructor-less Dependency Injection", relying on the AutoInject constructor
 * to attach its dependencies.
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
 * class Application extends DI.AutoInject { run() { ... } }
 * DI.resolve(Application).run();
 * @namespace
 * @property {Function} injectable - The dependency injection decorator function.
 * @property {Function} autoinjectable - A base class for managing "constructor-less" injection.
 * @property {Function} resolve - The service class resolver function.
 * @property {Object}   DI - A DI namespace containing the injectable() and resolve() functions and the AutoInject class.
 */
module.exports = {
    injectable: container.injectable,
    autoinjectable: container.autoinjectable,
    resolve: container.resolve,
    DI: container
};
