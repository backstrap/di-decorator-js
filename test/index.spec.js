
import {IoC}        from '../src/index';
import {injectable} from '../src/index';
import {resolve}    from '../src/index';
import {container}  from '../src/container';

describe('IoC', () => {
    it('exposes the container.injectable() function', () => {
        expect(injectable).toBe(container.injectable);
    });
    it('exposes the container.resolve() function', () => {
        expect(resolve).toBe(container.resolve);
    });
    it('exposes the container itself as "IoC"', () => {
        expect(IoC).toBe(container);
    });
});
