
import {injectable} from '../src/injectable';
import {container}  from '../src/container';

describe('injectable', () => {
    it('is the container.injectable() function', () => {
        expect(injectable).toBe(container.injectable);
    });
});
