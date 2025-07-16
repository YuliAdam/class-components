import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';
import {
  getAllRequest,
  getByNameOrIndexRequest,
  requestOptions,
} from '../../src/service/api';
import {
  IObjectInfoResponse,
  IAllPokemonResponse,
  IPokemon,
} from '../../src/types/types';
import { pokemonUrl } from '../../src/configs/apiConfig';

const BEFORE_ALL_TIMEOUT = 30000;

describe('get all pokemon request', () => {
  let response: IAllPokemonResponse;
  let results: Array<IObjectInfoResponse>;
  const offset = 0;
  const limit = 15;

  beforeAll(async () => {
    response = await getAllRequest(requestOptions.pokemon, {
      offset: offset,
      limit: limit,
    });
    results = response.results;
  }, BEFORE_ALL_TIMEOUT);

  test('should have next key', () => {
    expect(response.next).toBe(
      pokemonUrl.concat(`?offset=${offset + limit}&limit=${limit}`)
    );
  });
  test('should be results array with length', () => {
    expect(results.length).toBe(limit);
  });
  test('should have num of all elements', () => {
    expectTypeOf(response.count).toBeNumber();
  });
  test('should have prev key', () => {
    expect(response.previous).toBe(null);
  });
});

describe('get all pokemon request', () => {
  let response: IAllPokemonResponse;
  let results: Array<IObjectInfoResponse>;
  const offset = 10;
  const limit = 20;

  beforeAll(async () => {
    response = await getAllRequest(requestOptions.pokemon, {
      offset: offset,
      limit: limit,
    });
    results = response.results;
  }, BEFORE_ALL_TIMEOUT);

  test('should have next key', () => {
    expect(response.next).toBe(
      pokemonUrl.concat(`?offset=${offset + limit}&limit=${limit}`)
    );
  });
  test('should be results array with length', () => {
    expect(results.length).toBe(limit);
  });
  test('should have num of all elements', () => {
    expectTypeOf(response.count).toBeNumber();
  });
  test('should have prev key', () => {
    expect(response.previous).not.toBeNull();
  });
});

describe('get all ability request', () => {
  let response: IAllPokemonResponse;
  let results: Array<IObjectInfoResponse>;
  const offset = 0;
  const limit = 15;

  beforeAll(async () => {
    response = await getAllRequest(requestOptions.ability, {
      offset: offset,
      limit: limit,
    });
    results = response.results;
  }, BEFORE_ALL_TIMEOUT);

  test('should have next key', () => {
    expectTypeOf(response.next).toBeString();
  });
  test('should be results array with length', () => {
    expect(results.length).toBe(limit);
  });
  test('should have num of all elements', () => {
    expectTypeOf(response.count).toBeNumber();
  });
  test('should have prev key', () => {
    expect(response.previous).toBe(null);
  });
});

describe('get all type request', () => {
  let response: IAllPokemonResponse;
  let results: Array<IObjectInfoResponse>;
  const offset = 0;
  const limit = 15;

  beforeAll(async () => {
    response = await getAllRequest(requestOptions.type, {
      offset: offset,
      limit: limit,
    });
    results = response.results;
  }, BEFORE_ALL_TIMEOUT);

  test('should have next key', () => {
    expectTypeOf(response.next).toBeString();
  });
  test('should be results array with length', () => {
    expect(results.length).toBe(limit);
  });
  test('should have num of all elements', () => {
    expectTypeOf(response.count).toBeNumber();
  });
  test('should have prev key', () => {
    expect(response.previous).toBe(null);
  });
});

describe('get by pokemon name request', () => {
  let response: IPokemon;
  const name = 'Bulbasaur';

  beforeAll(async () => {
    response = await getByNameOrIndexRequest(requestOptions.pokemon, name);
  }, BEFORE_ALL_TIMEOUT);

  test('should have abilities', () => {
    expectTypeOf(response.abilities).toBeArray();
  });
  test('should have name', () => {
    expect(response.name).toBe(name.toLowerCase());
  });
  test('should have img', () => {
    expectTypeOf(response.img).toBeString();
  });
  test('should have types', () => {
    expectTypeOf(response.abilities).toBeArray();
  });
});

describe('get by ability request', () => {
  let response: { pokemon: { pokemon: IObjectInfoResponse }[] };
  const name = 'overgrow';

  beforeAll(async () => {
    response = await getByNameOrIndexRequest(requestOptions.ability, name);
  }, BEFORE_ALL_TIMEOUT);

  test('should have pokemons', () => {
    expectTypeOf(response.pokemon).toBeArray();
  });
});

describe('get by type request', () => {
  let response: { pokemon: { pokemon: IObjectInfoResponse }[] };
  const name = 'normal';

  beforeAll(async () => {
    response = await getByNameOrIndexRequest(requestOptions.type, name);
  }, BEFORE_ALL_TIMEOUT);

  test('should have pokemons', () => {
    expectTypeOf(response.pokemon).toBeArray();
  });
});

describe('get by type request', () => {
  let response: null;
  const name = 'n';

  beforeAll(async () => {
    response = await getByNameOrIndexRequest(requestOptions.type, name);
  }, BEFORE_ALL_TIMEOUT);

  test('should return null', () => {
    expect(response).toBeNull();
  });
});

describe('get by ability request', () => {
  let response: null;
  const name = 'n';

  beforeAll(async () => {
    response = await getByNameOrIndexRequest(requestOptions.ability, name);
  }, BEFORE_ALL_TIMEOUT);

  test('should return null', () => {
    expect(response).toBeNull();
  });
});
describe('get by pokemon name request', () => {
  let response: null;
  const name = 'n';

  beforeAll(async () => {
    response = await getByNameOrIndexRequest(requestOptions.pokemon, name);
  }, BEFORE_ALL_TIMEOUT);

  test('should return null', () => {
    expect(response).toBeNull();
  });
});
