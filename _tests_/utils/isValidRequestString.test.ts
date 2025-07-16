import { expect, it, describe } from 'vitest';
import isValidRequestString from '../../src/utils/isValidRequestString';

describe('isValidRequestString', () => {
  it('should test if request string is valid', () => {
    expect(isValidRequestString('')).toBeFalsy();
    expect(isValidRequestString('...')).toBeFalsy();
    expect(isValidRequestString('/')).toBeFalsy();
    expect(isValidRequestString('?')).toBeFalsy();
    expect(isValidRequestString('.test/?')).toBeTruthy();
    expect(isValidRequestString('.?/')).toBeFalsy();
    expect(isValidRequestString('test')).toBeTruthy();
  });
});
