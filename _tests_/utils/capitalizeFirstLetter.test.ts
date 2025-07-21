import { expect, it, describe } from 'vitest';
import capitalizeFirstLetter from '../../src/utils/capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('should capitalize first letter', () => {
    expect(capitalizeFirstLetter('test1')).toBe('Test1');
    expect(capitalizeFirstLetter('Test2')).toBe('Test2');
    expect(capitalizeFirstLetter('')).toBe('');
    expect(capitalizeFirstLetter('1')).toBe('1');
  });
});
