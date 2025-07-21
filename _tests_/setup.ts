import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getUrlByRequestOption, requestOptions } from '../src/service/api';
import { ITEMS_AT_PAGE } from '../src/components/results/Results';
import {
  getAllPokemonData,
  getPokemonByAbilityOrTypeData,
  getPokemonByUrlOrNameData,
  NOT_FOUND_URL,
  notFoundResponse,
  pokemonObject,
} from './responseData/data';

export const handlers = [
  http.get(
    getUrlByRequestOption(requestOptions.pokemon).concat(
      `?offset=0&limit=${ITEMS_AT_PAGE}`
    ),
    () => {
      return HttpResponse.json(getAllPokemonData);
    }
  ),
  http.get(
    getUrlByRequestOption(requestOptions.pokemon).concat(
      `/${pokemonObject.name}`
    ),
    () => {
      return HttpResponse.json(getPokemonByUrlOrNameData);
    }
  ),
  http.get(pokemonObject.url, () => {
    return HttpResponse.json(getPokemonByUrlOrNameData);
  }),

  http.get(
    getUrlByRequestOption(requestOptions.pokemon).concat(
      `/${pokemonObject.types[0]}`
    ),
    () => {
      return HttpResponse.json(...notFoundResponse);
    }
  ),
  http.get(
    getUrlByRequestOption(requestOptions.pokemon).concat(
      `/${pokemonObject.abilities[0]}`
    ),
    () => {
      return HttpResponse.json(...notFoundResponse);
    }
  ),
  http.get(
    getUrlByRequestOption(requestOptions.pokemon).concat(`/${NOT_FOUND_URL}`),
    () => {
      return HttpResponse.json(...notFoundResponse);
    }
  ),
  http.get(
    getUrlByRequestOption(requestOptions.ability).concat(
      `/${pokemonObject.abilities[0]}`
    ),
    () => {
      return HttpResponse.json(getPokemonByAbilityOrTypeData);
    }
  ),

  http.get(
    getUrlByRequestOption(requestOptions.ability).concat(
      `/${pokemonObject.types[0]}`
    ),
    () => {
      return HttpResponse.json(...notFoundResponse);
    }
  ),
  http.get(
    getUrlByRequestOption(requestOptions.ability).concat(`/${NOT_FOUND_URL}`),
    () => {
      return HttpResponse.json(...notFoundResponse);
    }
  ),

  http.get(
    getUrlByRequestOption(requestOptions.type).concat(
      `/${pokemonObject.types[0]}`
    ),
    () => {
      return HttpResponse.json(getPokemonByAbilityOrTypeData);
    }
  ),
  http.get(
    getUrlByRequestOption(requestOptions.type).concat(`/${NOT_FOUND_URL}`),
    () => {
      return HttpResponse.json(...notFoundResponse);
    }
  ),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});
