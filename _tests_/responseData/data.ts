import { getObjArr } from '../testUtils/getObjArr';

export const pokemonObject = {
  abilities: ['ability', 'ability.2'],
  name: 'name',
  img: 'img',
  types: ['type', 'type.2'],
  url: 'url',
};

export const pokemonData = { name: pokemonObject.name, url: pokemonObject.url };

export const getAllPokemonData = {
  count: 1,
  next: '',
  previous: null,
  results: [...getObjArr(pokemonData, 30)],
};

export const getPokemonByUrlOrNameData = {
  abilities: [
    { ability: { name: pokemonObject.abilities[0], url: 'url' } },
    { ability: { name: pokemonObject.abilities[1], url: 'url' } },
  ],
  name: pokemonObject.name,
  sprites: { front_default: pokemonObject.img },
  types: [
    { type: { name: pokemonObject.types[0], url: 'url' } },
    { type: { name: pokemonObject.types[1], url: 'url' } },
  ],
};

export const getPokemonByAbilityOrTypeData = {
  pokemon: [{ pokemon: pokemonData }],
};

export const notFoundResponse = [null, { status: 404 }];
export const NOT_FOUND_URL = 'not_found';
