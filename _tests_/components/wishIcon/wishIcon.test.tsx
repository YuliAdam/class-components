import { render } from '@testing-library/react';
import { WishIcon } from '../../../src/components/wishList/WishIcon';
import { describe, test } from 'vitest';
import '@testing-library/jest-dom';
import ReduxProvider from '../../testUtils/ReduxProvider';

describe('wish icon test', () => {
  test('loads and displays search with value from LS', async () => {
    render(<ReduxProvider child={<WishIcon />} />).debug();
  });
});
