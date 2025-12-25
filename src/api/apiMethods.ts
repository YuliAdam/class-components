import type {
  IAbilityOrTypeResponse,
  IObjectInfoResponse,
  IPokemonResponse,
} from '../types/types';
import getColor from '../utils/getColor';

export function parsePokemonObj(pokemon: IPokemonResponse) {
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

export function getPokemonsFromAbilityOrTypeResponse(
  response: IAbilityOrTypeResponse
) {
  return response.pokemon.map(
    (item: { pokemon: IObjectInfoResponse }) => item.pokemon
  );
}
