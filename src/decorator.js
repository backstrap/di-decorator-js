import { IoC } from './container';
/**
 *
 * @typedef {Object} class
 * @property {Object[]} providers 

 */

/**
 * Auto Dependency Injection
 * @param {...class[]} providers 
 */
export function Injectable(providers) {
    return (target) => {

        IoC.registry(target, providers);
        if (!providers) providers = [];

        return class extends target {
            constructor(...args) {
                super(...args.concat(providers.slice(args.length).map(instance => IoC.resolve(instance))));
            }
        };
    }
}