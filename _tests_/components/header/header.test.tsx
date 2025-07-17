import { render, screen } from '@testing-library/react';
import Header from '../../../src/components/header/Header';
import { expect, test } from 'vitest';

test('loads and displays header', async () => {
  render(<Header />);
  expect(await screen.findAllByTitle('Pokémon icon')).toBeTruthy();
});
