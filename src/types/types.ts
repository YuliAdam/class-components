export interface IAllPokemonResponse {
  count: number;
  next: string;
  previous: null | string;
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
  base_experience: number;
  height: number;
  weight: number;
}

export interface IPokemon {
  abilities: string[];
  name: string;
  img: string;
  types: string[];
  color: string;
}

export interface IAbilityOrTypeResponse {
  pokemon: { pokemon: IObjectInfoResponse }[];
}
