
import {container} from '../src/container';
import {Registry}  from '../src/Registry';

describe('container', () => {
    let TestClass1;

    beforeEach(() => {
        TestClass1 = class TestClass {};
        spyOn(Registry.prototype, 'register').and.callThrough();
    });

    describe('injectable method', () => {
        it('returns a function', () => {
            expect(container.injectable()).toStrictEqual(jasmine.any(Function));
        });
        it('returned function can register a no-args constructor', () => {
            container.injectable()(TestClass1);
            expect(Registry.prototype.register).toHaveBeenCalledWith(TestClass1, []);
        });
        it('returned function returns a constructor that can take services', () => {
            const TestClass2 = class TestClass2a {
                constructor(a) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                }
            };

            TestClass1.isInjectable = TestClass2.isInjectable = true;
            container.injectable(TestClass1)(TestClass2);
            expect(Registry.prototype.register).toHaveBeenCalledWith(TestClass2, [TestClass1]);
        });
    });

    describe('resolve method', () => {
        it('resolves service classes without constructor args', () => {
            container.injectable()(TestClass1);
            expect(container.resolve(TestClass1)).toStrictEqual(new TestClass1());
        });
        it('resolves service classes with constructor args', () => {
            const TestClass3 = class TestClass3 {
                constructor(a) {
                    // noinspection JSUnusedGlobalSymbols
                    this.a = a;
                }
            };
            const TestClass4 = class TestClass4 {};

            container.injectable()(TestClass4);
            container.injectable(TestClass4)(TestClass3);
            expect(container.resolve(TestClass3)).toStrictEqual(new TestClass3(new TestClass4()));
        });
        it('throws if class is not injectable', () => {
            expect(() => container.resolve(TestClass1)).toThrowError();
        });
    });
});
