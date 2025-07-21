import { expect, it, describe } from 'vitest';
import getRandomColor from '../../src/utils/getRandomColor';

const COLOR_REGEX =
  '^rgba\\((25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]?|[1-9][0-9]?|[0-9]), ?(25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]?|[1-9][0-9]?|[0-9]), ?(25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]?|[1-9][0-9]?|[0-9]), 0.4\\)$';

describe('getRandomColor', () => {
  it('should get random color', () => {
    expect(getRandomColor()).toMatch(new RegExp(COLOR_REGEX));
  });
});
