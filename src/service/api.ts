import { typeUrl, pokemonUrl, abilityUrl } from '../configs/apiConfig';

export const requestOptions = {
  pokemon: 'pokemon',
  type: 'type',
  ability: 'ability',
};

function getUrlByRequestOption(option: string) {
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
  return (
    await fetch(
      getUrlByRequestOption(option).concat(
        `?offset=${params.offset}&limit=${params.limit}`
      )
    )
  ).json();
}

export async function getByNameOrIndexRequest(
  option: string,
  name: string | number
) {
  const result = await fetch(getUrlByRequestOption(option).concat(`/${name}`));
  return result.status === 404 ? null : result.json();
}
