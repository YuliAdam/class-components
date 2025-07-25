export interface IAllPokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: IObjectInfoResponse[];
}

export interface IObjectInfoResponse {
  name: string;
  url: string;
}

export interface IPokemonResponse {
  abilities: { ability: IObjectInfoResponse }[];
  name: string;
  sprites: { front_default: string };
  types: { type: IObjectInfoResponse }[];
}

export interface IPokemon {
  abilities: string[];
  name: string;
  img: string;
  types: string[];
}

export interface IAbilityResponse {
  pokemon: { pokemon: IObjectInfoResponse }[];
}
