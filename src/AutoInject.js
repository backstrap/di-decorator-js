
/**
 * A base object class to be used for injectable services.
 * The AutoInject class implements "constructor-less dependency injection".
 * If you declare a class as "@injectable", and it extends the AutoInject class,
 * and you do not define a constructor for it (or any of its superclasses),
 * then it will inherit the AutoInject constructor, which assumes that
 * all the constructor args are (injectable) objects, and attaches them all
 * as properties of the object being created.  Each property is named
 * for the class of the dependency object, with the first character lower-cased.
 * After doing so, it Object.freeze()'es the object.
 *
 * @example
 * import {MyDependency} from 'MyDependency';
 * import {DI} from 'effortless-di';
 *
 * &#64;DI.injectable(MyDependency)
 * export class MyService extends DI.AutoInject { }
 *
 * // The resolved MyService object has an injected MyDependency in this.myDependency.
 * const myDependency = DI.resolve(MyService).myDependency;
 */
export class AutoInject {
    constructor(...args) {
        args.forEach(arg => {
            const name = Object.getPrototypeOf(arg).constructor.name;

            this[name[0].toLowerCase() + name.substring(1)] = arg;
        });
        // Injectable services should be stateless and immutable, so...
        Object.freeze(this);
    }
}
