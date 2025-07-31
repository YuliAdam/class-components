import type {
  IAbilityOrTypeResponse,
  IAllPokemonResponse,
  IObjectInfoResponse,
  IPokemonResponse,
} from '../types/types';
import getColor from '../utils/getColor';
import {
  getAllRequest,
  getByNameOrIndexRequest,
  requestOptions,
} from './apiRequests';

function getPokemonObj(pokemon: IPokemonResponse) {
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

export async function getPokemonAtPage(page: number, itemNum: number) {
  const result: IAllPokemonResponse = await getAllRequest(
    requestOptions.pokemon,
    { limit: itemNum, offset: page * itemNum }
  );
  return await Promise.all(
    result.results.map(async (pokemon: IObjectInfoResponse) => {
      const response = await (await fetch(pokemon.url)).json();
      return getPokemonObj(response);
    })
  );
}

export async function getPokemonBySearch(name: string) {
  const result: IPokemonResponse = await getByNameOrIndexRequest(
    requestOptions.pokemon,
    name
  );
  return result && getPokemonObj(result);
}

export async function getPokemonByAbilityOrType(searchStr: string) {
  const result: IAbilityOrTypeResponse =
    (await getByNameOrIndexRequest(requestOptions.ability, searchStr)) ||
    (await getByNameOrIndexRequest(requestOptions.type, searchStr));
  if (result) {
    return await Promise.all(
      result.pokemon.map(async (item: { pokemon: IObjectInfoResponse }) => {
        const response = await (await fetch(item.pokemon.url)).json();
        return getPokemonObj(response);
      })
    );
  }
}
