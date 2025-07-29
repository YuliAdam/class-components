import { useContext, useEffect, useState } from 'react';
import styles from './card.module.scss';
import {
  getAllRequest,
  getByNameOrIndexRequest,
  requestOptions,
} from '../../service/api';
import type {
  IAbilityOrTypeResponse,
  IAllPokemonResponse,
  IObjectInfoResponse,
  IPokemon,
  IPokemonResponse,
} from '../../types/types';
import PokemonCard from './PokemonCard';
import Pagination from '../pagination/Pagination';
import isValidRequestString from '../../utils/isValidRequestString';
import Loading from '../loading/Loading';
import { ItemContext, PageContext, SearchContext } from '../../pages/Main';
import { useNavigate } from 'react-router';
import { replacePathParams } from '../../utils/replacePathParams';
import { PATH } from '../../configs/routesConfig';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getSearchValueFromLocalStorage } from '../../localStorage/localStorage';
import getColor from '../../utils/getColor';

interface State {
  items: IPokemon[];
  page: number;
  isSearchMood: boolean;
  isLoading: boolean;
}

export const ITEMS_AT_PAGE = 15;

function getPokemonObj(pokemon: IPokemonResponse) {
  return {
    abilities: [
      ...pokemon.abilities.map(
        (item: { ability: IObjectInfoResponse }) => item.ability.name
      ),
    ],
    name: pokemon.name,
    img: pokemon.sprites.front_default,
    types: [
      ...pokemon.types.map(
        (item: { type: IObjectInfoResponse }) => item.type.name
      ),
    ],
    color: getColor(pokemon.height, pokemon.base_experience, pokemon.weight),
  };
}

async function getPokemonRequest(page: number) {
  const result: IAllPokemonResponse = await getAllRequest(
    requestOptions.pokemon,
    { limit: ITEMS_AT_PAGE, offset: page * ITEMS_AT_PAGE }
  );
  return await Promise.all(
    result.results.map(async (pokemon: IObjectInfoResponse) => {
      const response = await (await fetch(pokemon.url)).json();
      return getPokemonObj(response);
    })
  );
}

async function getPokemonBySearchRequest(name: string) {
  const result: IPokemonResponse = await getByNameOrIndexRequest(
    requestOptions.pokemon,
    name
  );
  return result && getPokemonObj(result);
}

async function getPokemonByAbilityOrTypeRequest(searchStr: string) {
  const result: IAbilityOrTypeResponse =
    (await getByNameOrIndexRequest(requestOptions.ability, searchStr)) ||
    (await getByNameOrIndexRequest(requestOptions.type, searchStr));
  if (result) {
    return await Promise.all(
      result.pokemon.map(async (item: { pokemon: IObjectInfoResponse }) => {
        const response = await (await fetch(item.pokemon.url)).json();
        return getPokemonObj(response);
      })
    );
  }
}

const initState: State = {
  items: [],
  page: 0,
  isSearchMood: false,
  isLoading: true,
};

export default function CardList() {
  const [state, setState] = useState(initState);
  const [hasError, setError] = useState(false);
  const search = useContext(SearchContext);
  const page = useContext(PageContext);
  const itemContext = useContext(ItemContext);
  const navigate = useNavigate();
  const localStorageState = useLocalStorage()[0];

  useEffect(() => {
    try {
      if (!getSearchValueFromLocalStorage()) {
        getPokemonRequest(0).then((res) => {
          setState({
            items: res,
            page: 0,
            isSearchMood: false,
            isLoading: false,
          });
        });
        navigate(replacePathParams(PATH.pokemonParams, { page: '1' }), {
          replace: true,
        });
      } else {
        updateCards();
        navigate(
          replacePathParams(PATH.pokemonParams, {
            page: '1',
            searchParam: search?.value,
          }),
          { replace: true }
        );
      }
    } catch (err) {
      if (err instanceof Error) generateError(err.message);
    }
  }, [search?.value, localStorageState]);

  function generateError(message: string) {
    console.log(message);
    setError(true);
  }

  function setLoadingMood() {
    setState({
      items: [],
      page: state.page,
      isSearchMood: state.isSearchMood,
      isLoading: true,
    });
  }

  async function updateCards() {
    try {
      setLoadingMood();
      if (isValidRequestString(search?.value || '')) {
        const pokemon = await getPokemonBySearchRequest(search?.value || '');
        if (pokemon) {
          setState({
            items: [pokemon],
            page: 0,
            isSearchMood: true,
            isLoading: false,
          });
        } else {
          const pokemonsByAbilityOrType =
            await getPokemonByAbilityOrTypeRequest(search?.value || '');
          if (pokemonsByAbilityOrType) {
            setState({
              items: pokemonsByAbilityOrType,
              page: 0,
              isSearchMood: true,
              isLoading: false,
            });
          } else {
            setState({
              items: [],
              page: 0,
              isSearchMood: true,
              isLoading: false,
            });
            navigate(
              replacePathParams(PATH.pokemonNotFoundParams, {
                searchParam: search?.value || '',
              }),
              { replace: true }
            );
          }
          page?.setValue(0);
        }
      } else {
        setState({
          items: await getPokemonRequest(0),
          page: 0,
          isSearchMood: false,
          isLoading: false,
        });
      }
    } catch (err) {
      if (err instanceof Error) generateError(err.message);
    }
  }

  const prevClick = () => {
    if (state.page) changePage(-1);
  };

  const nextClick = () => {
    if (hasNextPage()) changePage(+1);
  };

  async function changePage(num: number) {
    itemContext?.setValue(null);
    setLoadingMood();
    page?.setValue(state.page + 1 + num);
    if (!state.isSearchMood) {
      navigate(
        replacePathParams(PATH.pokemonParams, {
          page: (state.page + 1 + num).toString(),
        }),
        { replace: true }
      );
      setState({
        items: await getPokemonRequest(state.page + num),
        page: state.page + num,
        isSearchMood: false,
        isLoading: false,
      });
    } else {
      navigate(
        replacePathParams(PATH.pokemonParams, {
          page: (state.page + 1 + num).toString(),
          searchParam: search?.value,
        }),
        { replace: true }
      );
      const copyItems = state.items.slice();
      setLoadingMood();
      setTimeout(() => {
        setState((prevState: State) => ({
          items: copyItems,
          page: prevState.page + num,
          isSearchMood: true,
          isLoading: false,
        }));
      }, 300);
    }
  }

  function hasNextPage() {
    return state.isSearchMood
      ? state.items.length > ITEMS_AT_PAGE * (state.page + 1)
      : state.items.length >= ITEMS_AT_PAGE;
  }

  function getPokemonCards() {
    return state.items.map((item, i) => {
      if (
        state.items.length <= ITEMS_AT_PAGE ||
        (i >= state.page * ITEMS_AT_PAGE &&
          i < (state.page + 1) * ITEMS_AT_PAGE)
      ) {
        return (
          <PokemonCard
            key={item.name}
            pokemon={item}
            onClick={() => selectItem(item)}
          />
        );
      }
    });
  }
  function selectItem(item: IPokemon) {
    itemContext?.setValue(item);
    navigate(
      replacePathParams(PATH.itemParams, {
        page: (state.page + 1).toString(),
        searchParam: search?.value || '',
        item: item.name,
      }),
      { replace: true }
    );
  }

  function generateErrorIfHasError() {
    if (hasError) {
      throw Error('Error');
    }
  }

  return state.isLoading ? (
    <Loading />
  ) : (
    <>
      {generateErrorIfHasError()}
      <section
        className={
          state.items.length === 1
            ? styles.result
            : itemContext?.value
              ? styles.results_half
              : styles.results
        }
        data-testid="pokemon card wrap"
      >
        {getPokemonCards()}
      </section>
      <Pagination
        pageNum={state.page + 1}
        prevClick={prevClick}
        nextClick={nextClick}
        hasNextPage={hasNextPage()}
      />
    </>
  );
}
