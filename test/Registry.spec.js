
import {Registry} from '../src/Registry';

describe('Registry', () => {
    let registry;
    let TestClass1;

    beforeEach(() => {
        registry = new Registry();
        TestClass1 = class TestClass {};
    });

    describe('register method', () => {
        it('registers service classes without constructor args', () => {
            registry.register(TestClass1, []);
            expect(TestClass1.isInjectable).toBe(true);
        });
        it('registers service classes with constructor args', () => {
            const TestClass2 = class {
                constructor(a, b) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                    // noinspection JSUnusedGlobalSymbols
                    this.b = b;
                }
            };

            registry.register(TestClass2, [class {}, class {}]);
            expect(TestClass2.isInjectable).toBe(true);
        });
        it('throws if services array length does not match constructor', () => {
            expect(() => registry.register(class {}, [class {}])).toThrowError();
            expect(() => registry.register(class {
                constructor(a) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                }
            }, [])).toThrowError();
        });
    });

    describe('resolve method', () => {
        it('resolves service classes without constructor args', () => {
            registry.register(TestClass1, []);
            expect(registry.resolve(TestClass1)).toStrictEqual(new TestClass1());
        });
        it('resolves to the same instance every time', () => {
            registry.register(TestClass1, []);
            expect(registry.resolve(TestClass1)).toBe(registry.resolve(TestClass1));
        });
        it('resolves service classes with constructor args', () => {
            const TestClass3 = class TestClass3 {
                constructor(a) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                }
            };
            const TestClass4 = class TestClass4 {};

            registry.register(TestClass4, []);
            registry.register(TestClass3, [TestClass4]);
            expect(registry.resolve(TestClass3)).toStrictEqual(new TestClass3(new TestClass4()));
        });
        it('throws if class is not injectable', () => {
            expect(() => registry.resolve(TestClass1)).toThrowError();
        });
    });
});
