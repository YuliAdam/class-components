import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import SelectPokemon from '../../src/pages/SelectPokemon';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

describe('selectPokemon test', () => {
  test('loads and displays selectPokemon', async () => {
    render(
      <MemoryRouter>
        <SelectPokemon />
      </MemoryRouter>
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
