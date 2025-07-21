import { render, screen } from '@testing-library/react';
import PokemonCard from '../../../src/components/results/PokemonCard';
import { describe, expect, test } from 'vitest';
import capitalizeFirstLetter from '../../../src/utils/capitalizeFirstLetter';
import '@testing-library/jest-dom';
import { pokemonObject } from '../../responseData/data';

const mockDate = {
  pokemon: {
    abilities: pokemonObject.abilities,
    name: pokemonObject.name,
    img: pokemonObject.img,
    types: pokemonObject.types,
  },
};

describe('pokemon card test', () => {
  test('loads and displays pokemonCard', async () => {
    render(<PokemonCard {...mockDate} />);
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
    render(<PokemonCard {...mockDate} />).debug();
    expect(screen.getAllByText(`:`)).toHaveLength(2);
  });
});
