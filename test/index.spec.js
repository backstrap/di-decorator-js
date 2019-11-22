
import defaultObj       from '../src/index';
import {DI}             from '../src/index';
import {injectable}     from '../src/index';
import {autoinjectable} from '../src/index';
import {resolve}        from '../src/index';
import {container}      from '../src/container';

describe('effortless-di', () => {
    it('exposes the container.injectable() function', () => {
        expect(injectable).toBe(container.injectable);
    });
    it('exposes the container.resolve() function', () => {
        expect(resolve).toBe(container.resolve);
    });
    it('exposes the container itself as "DI"', () => {
        expect(DI).toBe(container);
    });
    it('only exposes injectable, resolve, AutoInject, and DI', () => {
        expect(defaultObj).toStrictEqual({
            injectable: injectable,
            resolve: resolve,
            autoinjectable: autoinjectable,
            DI: DI,
        })
    });
});
