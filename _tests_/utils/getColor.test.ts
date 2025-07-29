import { expect, it, describe } from 'vitest';
import getColor from '../../src/utils/getColor';

const COLOR_REGEX =
  '^rgba\\((25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]?|[1-9][0-9]?|[0-9]), ?(25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]?|[1-9][0-9]?|[0-9]), ?(25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]?|[1-9][0-9]?|[0-9]), 0.4\\)$';

describe('getColor', () => {
  it('should get color', () => {
    expect(getColor(100, 200, 500)).toMatch(new RegExp(COLOR_REGEX));
  });
});
