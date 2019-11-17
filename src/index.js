'use strict';

const container = require('./container').container;

/**
 * A simple Inversion-of-Control dependency injection module.
 * Use the "injectable" decorator to mark your injectable service providers,
 * then use the "resolve" function to acquire the fully resolved top-level service object.
 * @example
 *   import {injectable} from 'IoC';
 *   import {resolve} from 'IoC';
 *   @injectable(Service1, ...)
 *   class Application { constructor(service1, ...) { ... }, run() { ... } }
 *   resolve(Application).run();
 * @example
 *   import IoC from 'IoC';
 *   @IoC.injectable(Service1, ...)
 *   class Application { constructor(service1, ...) { ... }, run() { ... } }
 *   IoC.resolve(Application).run();
 */
module.exports = {
    injectable: container.injectable,
    resolve: container.resolve,
    IoC: container
};
