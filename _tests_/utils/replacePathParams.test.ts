import { expect, it, describe } from 'vitest';
import { replacePathParams } from '../../src/utils/replacePathParams';
import { PATH } from '../../src/configs/routesConfig';

const params = {
  page: '1',
  searchParam: 'test',
  item: 'testItem',
};

describe('replacePathParams', () => {
  it('should return path', () => {
    expect(replacePathParams(PATH.pokemonParams, {})).toEqual(PATH.pokemon);
    expect(replacePathParams(PATH.itemParams, {})).toEqual(PATH.item);
    expect(
      replacePathParams(PATH.pokemonParams, {
        page: params.page,
        searchParam: params.searchParam,
      })
    ).toEqual(
      PATH.pokemon.concat(`?page=${params.page}&param=${params.searchParam}`)
    );
    expect(replacePathParams(PATH.itemParams, {})).toEqual(PATH.item);
    expect(
      replacePathParams(PATH.itemParams, {
        page: params.page,
        searchParam: params.searchParam,
        item: params.item,
      })
    ).toEqual(
      PATH.item
        .replace(':item', params.item)
        .concat(`?page=${params.page}&param=${params.searchParam}`)
    );
  });
});
