import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../configs/apiConfig';
import type {
  IAbilityOrTypeResponse,
  IAllPokemonResponse,
  IPokemonResponse,
} from '../types/types';

export const pokemonApiSlice = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  endpoints: (builder) => {
    return {
      getAllRequest: builder.query({
        query: (arg: {
          option: string;
          params: { limit: number; offset: number };
        }) =>
          arg.option.concat(
            `?offset=${arg.params.offset}&limit=${arg.params.limit}`
          ),
      }),
      getByNameOrIndexRequest: builder.query({
        query: (arg: { option: string; param: string }) =>
          arg.param ? arg.option.concat(`/${arg.param}`) : 'error',
      }),
      getPokemonByUrl: builder.query({
        query: (pokemonUrl: string) => pokemonUrl,
      }),
    };
  },
});

export async function getMultiplePokemonInfoFromResults(
  pokemons: IAllPokemonResponse
) {
  const { useGetPokemonByUrlQuery } = pokemonApiSlice;
  const promises = pokemons.results.map(
    (item) =>
      new Promise((resolve, reject) => {
        const { data, error } = useGetPokemonByUrlQuery(item.url);
        if (error) reject(error);
        if (data) resolve(data);
      })
  );
  try {
    const results = await Promise.all(promises);
    return results as IPokemonResponse[];
  } catch (err) {
    console.log('Get multiple pokemon error');
    throw err;
  }
}

export async function getMultiplePokemonInfoFromTypeOrAbility(
  pokemons: IAbilityOrTypeResponse
) {
  const { useGetPokemonByUrlQuery } = pokemonApiSlice;
  const promises = pokemons.pokemon.map(
    (item) =>
      new Promise((resolve, reject) => {
        const { data, error } = useGetPokemonByUrlQuery(item.pokemon.url);
        if (error) reject(error);
        if (data) resolve(data);
      })
  );
  try {
    const results = await Promise.all(promises);
    return results as IPokemonResponse[];
  } catch (err) {
    console.log('Get multiple pokemon error');
    throw err;
  }
}

export const {
  useGetAllRequestQuery,
  useGetByNameOrIndexRequestQuery,
  useGetPokemonByUrlQuery,
} = pokemonApiSlice;
