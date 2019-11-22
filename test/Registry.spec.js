
import {Registry} from '../src/Registry';

describe('Registry', () => {
    let registry;
    let TestClass1;

    beforeEach(() => {
        registry = new Registry();
        TestClass1 = class TestClass { };
    });

    describe('register method', () => {
        it('registers service classes without constructor args', () => {
            registry.register(TestClass1, []);
            expect(TestClass1.isInjectable).toBe(true);
        });
        it('registers service classes with constructor args', () => {
            const TestClass2 = class TestClass2 {
                constructor(a, b) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                    // noinspection JSUnusedGlobalSymbols
                    this.b = b;
                }
            };

            registry.register(TestClass2, [class A { }, class B { }]);
            expect(TestClass2.isInjectable).toBe(true);
        });
        it('throws if services array length does not match constructor', () => {
            const TestClass2 = class TestClass2 {
                constructor(a) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                }
            };

            expect(() => registry.register(TestClass2, [class A { }, class B { }])).toThrowError('Dependency count for TestClass2 should be 1');
            expect(() => registry.register(TestClass2, [])).toThrowError('Dependency count for TestClass2 should be 1');
        });
        it('works with inherited constructor', () => {
            const TestClass2 = class TestClass2 {
                constructor(a) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                }
            };
            const TestClass3 = class TestClass3 extends TestClass2 { };

            registry.register(TestClass1, []);
            registry.register(TestClass2, [TestClass1]);
            registry.register(TestClass3, [TestClass1]);

            expect(registry.resolve(TestClass3).a).toBeTruthy();
        });
        it('throws if services array length too short for inherited constructor', () => {
            const TestClass2 = class TestClass2 {
                constructor(a, b) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                    // noinspection JSUnusedGlobalSymbols
                    this.b = b;
                }
            };
            const TestClass3 = class TestClass3 extends TestClass2 { };
            const classA = class A { };

            registry.register(TestClass2, [classA, class B { }]);
            expect(() => registry.register(TestClass3, [classA])).toThrowError('Dependency count for TestClass3 should be at least 2');
        });
        it('throws if services do not match inherited constructor', () => {
            const TestClass2 = class TestClass2 {
                constructor(a, b) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                    // noinspection JSUnusedGlobalSymbols
                    this.b = b;
                }
            };
            const TestClass3 = class TestClass3 extends TestClass2 { };
            const classA = class A { };

            registry.register(TestClass2, [classA, class B { }]);
            expect(() => registry.register(TestClass3, [classA, class C { }])).toThrowError('Dependency mis-match for TestClass3 at C');
        });
        it('throws if there is an injection conflict', () => {
            const TestClass2 = class TestClass2 {
                constructor(a) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                }
            };
            const TestClass3 = class TestClass3 extends TestClass2 { };
            const classAbc = class Abc { };
            const classB = class B extends classAbc { };

            registry.register(TestClass2, [classAbc]);
            expect(() => registry.register(TestClass3, [classB, classAbc])).toThrowError('injection conflict! Re-use of "TestClass2" injection in "TestClass3"');
        });
    });

    describe('autoInject method', () => {
        it('calls register method', () => {
            spyOn(registry, 'register');
            spyOn(registry, 'get').and.returnValue({names: []});

            registry.autoInject(TestClass1, []);
            expect(registry.register).toHaveBeenCalledTimes(1);
            expect(registry.register).toHaveBeenCalledWith(TestClass1, []);
        });
        it('returns a constructor', () => {
            expect(typeof registry.autoInject(TestClass1, [])).toBe('function');
        });
        it('returned constructor sets properties on constructed object', () => {
            const TestClass2 = class TestClass2 { };
            const ctor = registry.autoInject(TestClass1, [TestClass2]);
            const obj = new ctor('a');

            registry.register(TestClass2, []);
            expect(obj['testClass2']).toBe('a');
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
            const TestClass4 = class TestClass4 { };

            registry.register(TestClass4, []);
            registry.register(TestClass3, [TestClass4]);
            expect(registry.resolve(TestClass3)).toStrictEqual(new TestClass3(new TestClass4()));
        });
        it('throws if class is not injectable', () => {
            expect(() => registry.resolve(TestClass1)).toThrowError('Target is not injectable for TestClass');
        });
    });

    describe('makeName method', () => {
        it('returns a camelcase name with lowercase first word', () => {
            expect(registry.makeName(class Abc { })).toBe('abc');
            expect(registry.makeName(class ABC { })).toBe('abc');
            expect(registry.makeName(class A { })).toBe('a');
            expect(registry.makeName(class AnyClass { })).toBe('anyClass');
            expect(registry.makeName(class ABCClass { })).toBe('abcClass');
        });
    });
});
