import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import PokemonNotFound from '../../src/pages/PokemonNotFound';
import { MemoryRouter } from 'react-router';
import { NOT_FOUND_MESSAGE } from '../../src/components/notFound/NotFound';

describe('main test', () => {
  test('loads and displays main', async () => {
    render(
      <MemoryRouter>
        <PokemonNotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(NOT_FOUND_MESSAGE)).toBeInTheDocument();
  });
});
