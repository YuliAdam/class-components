import { typeUrl, pokemonUrl, abilityUrl } from '../configs/apiConfig';

export const requestOptions = {
  pokemon: 'pokemon',
  type: 'type',
  ability: 'ability',
};

export function getUrlByRequestOption(option: string) {
  return option === requestOptions.pokemon
    ? pokemonUrl
    : option === requestOptions.type
      ? typeUrl
      : abilityUrl;
}

export async function getAllRequest(
  option: string,
  params: { limit: number; offset: number } = { limit: 15, offset: 0 }
) {
  const result = await fetch(
    getUrlByRequestOption(option).concat(
      `?offset=${params.offset}&limit=${params.limit}`
    )
  );
  if (result.status === 500) {
    throw Error('Server error');
  }
  return result.json();
}

export async function getByNameOrIndexRequest(
  option: string,
  name: string | number
) {
  const result = await fetch(getUrlByRequestOption(option).concat(`/${name}`));
  if (result.status === 500) {
    throw Error('Server error');
  }
  return Math.trunc(result.status / 100) === 4 ? null : result.json();
}
