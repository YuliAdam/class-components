import { render, screen } from '@testing-library/react';
import PokemonCard from '../../../src/components/results/PokemonCard';
import { describe, expect, test } from 'vitest';
import capitalizeFirstLetter from '../../../src/utils/capitalizeFirstLetter';

describe('pokemon card test', () => {
  const mockDate = {
    pokemon: {
      abilities: ['ability1', 'ability2'],
      name: 'pokemon name',
      img: 'pokemon img url',
      types: ['type1', 'type2'],
    },
  };

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
    if (title.parentElement) {
      expect(title.parentElement.style.backgroundColor).toBeTruthy();
    }
  });
});
