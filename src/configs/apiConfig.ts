export const url: string = import.meta.env.VITE_URL;
export const requestOptions = {
  pokemon: 'pokemon',
  type: 'type',
  ability: 'ability',
};
export const pokemonUrl = url.concat(requestOptions.pokemon);
export const typeUrl = url.concat(requestOptions.type);
export const abilityUrl = url.concat(requestOptions.ability);
