import { expect, it, describe } from 'vitest';
import isValidRequestString from '../../src/utils/isValidRequestString';

const falseStringArr = ['', '...', '/', '?', '.?/'];
const trueStringArr = ['.test/?', 'test'];

describe('isValidRequestString', () => {
  it('should test if request string is valid', () => {
    falseStringArr.forEach((str) =>
      expect(isValidRequestString(str)).toBeFalsy()
    );
    trueStringArr.forEach((str) =>
      expect(isValidRequestString(str)).toBeTruthy()
    );
  });
});
