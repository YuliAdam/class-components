import { render, screen } from '@testing-library/react';
import Loading from '../../../src/components/loading/Loading';
import { expect, test } from 'vitest';

test('loads and displays header', async () => {
  render(<Loading />);
  expect(await screen.findAllByAltText('loading...')).toBeTruthy();
});
