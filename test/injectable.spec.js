
import {injectable} from 'injectable';
import {container}  from 'container';

describe('IoC/injectable', () => {
    it('is the container.injectable() function', () => {
        expect(injectable).toBe(container.injectable);
    });
});
