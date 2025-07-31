import { render, screen } from '@testing-library/react';
import PokemonCard from '../../../src/components/cards/PokemonCard';
import { describe, expect, test, vi } from 'vitest';
import capitalizeFirstLetter from '../../../src/utils/capitalizeFirstLetter';
import '@testing-library/jest-dom';
import { testPokemon } from '../../responseData/data';
import ReduxProvider from '../../testUtils/ReduxProvider';

const mockDate = {
  pokemon: testPokemon,
  onClick: vi.fn(),
  className: '',
};

describe('pokemon card test', () => {
  test('loads and displays pokemonCard', async () => {
    render(<ReduxProvider child={<PokemonCard {...mockDate} />} />);
    const title = screen.getByText(
      capitalizeFirstLetter(mockDate.pokemon.name)
    );
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText(`: ${mockDate.pokemon.abilities.join(', ')}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`: ${mockDate.pokemon.types.join(', ')}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(`pokemon img`)).toHaveAttribute(
      'src',
      mockDate.pokemon.img
    );
  });

  test('loads and displays pokemonCard missing props', async () => {
    mockDate.pokemon.abilities = [];
    mockDate.pokemon.types = [];
    render(<ReduxProvider child={<PokemonCard {...mockDate} />} />);
    expect(screen.getAllByText(`:`)).toHaveLength(2);
  });
});
