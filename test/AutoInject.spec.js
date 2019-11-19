
import {AutoInject} from '../src/AutoInject';

describe('AutoInject class', () => {
    describe('constructor', () => {
        it('creates an empty object if it has no arguments', () => {
            const subject = new AutoInject();

            expect(Object.keys(subject)).toStrictEqual([]);
        });
        it('creates an instance property for each of its arguments', () => {
            const obj = { };
            const array = [ ];
            const func = new Function();
            const testClass = new (class TestClass { })();
            const subject = new AutoInject(obj, array, func, testClass);

            expect(Object.keys(subject)).toStrictEqual(['object', 'array', 'function', 'testClass']);
            expect(subject.object).toBe(obj);
            expect(subject.array).toBe(array);
            expect(subject.function).toBe(func);
            expect(subject['testClass']).toBe(testClass);
        });
    });
});
