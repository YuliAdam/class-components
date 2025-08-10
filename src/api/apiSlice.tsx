import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../configs/apiConfig';

export const pokemonApiSlice = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  tagTypes: ['Pokemon'],
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
        providesTags: ['Pokemon'],
      }),
      getByNameOrIndexRequest: builder.query({
        query: (arg: { option: string; param: string }) =>
          arg.param ? arg.option.concat(`/${arg.param}`) : 'error',
        providesTags: ['Pokemon'],
      }),
      getPokemonByUrl: builder.query({
        query: (pokemonUrl: string) => pokemonUrl,
        providesTags: ['Pokemon'],
      }),

      invalidateCache: builder.mutation({
        query: () => '',
        invalidatesTags: ['Pokemon'],
      }),
    };
  },
});

export const {
  useGetAllRequestQuery,
  useGetByNameOrIndexRequestQuery,
  useGetPokemonByUrlQuery,
  useInvalidateCacheMutation,
} = pokemonApiSlice;
