import { render, screen, waitFor } from '@testing-library/react';
import PokemonCard from '../../../src/components/cards/PokemonCard';
import { describe, expect, test, vi } from 'vitest';
import capitalizeFirstLetter from '../../../src/utils/capitalizeFirstLetter';
import '@testing-library/jest-dom';
import { pokemonData, pokemonObject } from '../../responseData/data';
import ReduxProvider from '../../testUtils/ReduxProvider';

const mockDate = {
  pokemon: pokemonData,
  onClick: vi.fn(),
  className: '',
};

describe('pokemon card test', () => {
  test('loads and displays pokemonCard', async () => {
    render(<ReduxProvider child={<PokemonCard {...mockDate} />} />).debug();
    await waitFor(async () => {
      expect(
        await screen.findAllByText(capitalizeFirstLetter(pokemonObject.name))
      ).toBeTruthy();
    });
    const title = screen.getByText(capitalizeFirstLetter(pokemonObject.name));
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText(`: ${pokemonObject.abilities.join(', ')}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`: ${pokemonObject.types.join(', ')}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(`pokemon img`)).toHaveAttribute(
      'src',
      pokemonObject.img
    );
  });

  test('loads and displays pokemonCard missing props', async () => {
    pokemonObject.abilities = [];
    pokemonObject.types = [];
    render(<ReduxProvider child={<PokemonCard {...mockDate} />} />);
  });
});
