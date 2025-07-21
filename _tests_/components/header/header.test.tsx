import { render, screen } from '@testing-library/react';
import Header from '../../../src/components/header/Header';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';

describe('header test', () => {
  test('loads and displays header', async () => {
    render(<Header />);
    expect(await screen.findByTitle('Pokémon icon')).toBeInTheDocument();
  });
});
