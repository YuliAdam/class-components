import {
  abilityUrl,
  pokemonUrl,
  requestOptions,
  typeUrl,
} from '../../src/configs/apiConfig';

export function getUrlByRequestOption(option: string) {
  return option === requestOptions.pokemon
    ? pokemonUrl
    : option === requestOptions.type
      ? typeUrl
      : abilityUrl;
}
