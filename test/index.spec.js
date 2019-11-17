
import {IoC}        from 'index';
import {injectable} from 'index';
import {resolve}    from 'index';
import {container}  from 'container';

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
