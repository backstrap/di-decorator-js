import { IoC } from './container';
/**
 *
 * @typedef {Object} class
 * @property {Array} providers 

 */

/**
 * Auto Dependency Injection
 * @param {...class} obj 
 */
export function Injectable(obj) {

    return (target) => {

        IoC.registry(target, providers);

        if (typeof (obj) !== 'object') return;

        const providers = obj.providers;

        if (!providers) throw new Error('Provider field not found \n Example: @Injectable({privders:[MyProvider]})')
        if (!Array.isArray(providers)) throw new Error('Providers is not a Dependency Array \n Example: @Injectable({privders:[MyProvider]})')

        return class extends target {
            constructor(...args) {
                super(...args.concat(providers.slice(args.length).map(instance => IoC.resolve(instance))));
            }
        };
    }
}