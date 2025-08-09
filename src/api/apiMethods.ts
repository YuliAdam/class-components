import type {
  IAbilityOrTypeResponse,
  IAllPokemonResponse,
  IObjectInfoResponse,
  IPokemonResponse,
} from '../types/types';
import getColor from '../utils/getColor';

export function getPokemonObj(pokemon: IPokemonResponse) {
  return {
    id: pokemon.id,
    abilities: [
      ...pokemon.abilities.map(
        (item: { ability: IObjectInfoResponse }) => item.ability.name
      ),
    ],
    name: pokemon.name,
    img: pokemon.sprites.front_default,
    types: [
      ...pokemon.types.map(
        (item: { type: IObjectInfoResponse }) => item.type.name
      ),
    ],
    color: getColor(pokemon.height, pokemon.base_experience, pokemon.weight),
  };
}

export async function getPokemonAtPage(data: IAllPokemonResponse) {
  return data
    ? await Promise.all(
        data.results.map(async (pokemon: IObjectInfoResponse) => {
          const response = await (await fetch(pokemon.url)).json();
          return getPokemonObj(response);
        })
      )
    : [];
}

export function getPokemonBySearch(pokemon: IPokemonResponse) {
  return pokemon && getPokemonObj(pokemon);
}

export async function getPokemonByAbilityOrType(data: IAbilityOrTypeResponse) {
  return await Promise.all(
    data.pokemon.map(async (item: { pokemon: IObjectInfoResponse }) => {
      const response = await (await fetch(item.pokemon.url)).json();
      return getPokemonObj(response);
    })
  );
}
