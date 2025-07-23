import React, { useEffect, useState } from 'react';
import styles from './results.module.scss';
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
import NotFound from '../notFound/NotFound';
import isValidRequestString from '../../utils/isValidRequestString';
import { getSearchValueFromLocalStorage } from '../../localStorage/localStorage';
import Loading from '../loading/Loading';

interface State {
  items: IPokemon[];
  page: number;
  isSearchMood: boolean;
  isLoading: boolean;
}

interface Props {
  searchValue: string;
  deleteSearch: () => void;
  hasError: boolean;
  generateError: () => void;
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

export default function Results(props: Props) {
  const [state, setState] = useState(initState);

  function setLoadingMood() {
    setState({
      items: [],
      page: state.page,
      isSearchMood: state.isSearchMood,
      isLoading: true,
    });
  }

  useEffect(() => {
    try {
      if (!getSearchValueFromLocalStorage()) {
        getPokemonRequest(state.page).then((res) => {
          setState({
            items: res,
            page: state.page,
            isSearchMood: false,
            isLoading: true,
          });
        });
      } else {
        updateCards();
      }
    } catch {
      props.generateError();
    }
  }, [props.searchValue]);

  async function updateCards() {
    try {
      setLoadingMood();
      if (isValidRequestString(props.searchValue)) {
        const pokemon = await getPokemonBySearchRequest(props.searchValue);
        if (pokemon) {
          setState({
            items: [pokemon],
            page: 0,
            isSearchMood: true,
            isLoading: false,
          });
        } else {
          const pokemonsByAbilityOrType =
            await getPokemonByAbilityOrTypeRequest(props.searchValue);
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
          }
        }
      } else {
        setState({
          items: await getPokemonRequest(0),
          page: 0,
          isSearchMood: false,
          isLoading: false,
        });
      }
    } catch {
      props.generateError();
    }
  }

  const prevClick = () => {
    if (state.page) changePage(-1);
  };

  const nextClick = () => {
    if (hasNextPage()) changePage(+1);
  };

  async function changePage(num: number) {
    setLoadingMood();
    if (!state.isSearchMood) {
      setState({
        items: await getPokemonRequest(state.page + num),
        page: state.page + num,
        isSearchMood: false,
        isLoading: false,
      });
    } else {
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
        return <PokemonCard key={item.name} pokemon={item} />;
      }
    });
  }

  function generateErrorIfHasError() {
    if (props.hasError) {
      throw Error('Error');
    }
  }

  return state.items.length !== 0 ? (
    <>
      {generateErrorIfHasError()}
      <section
        className={state.items.length === 1 ? styles.result : styles.results}
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
  ) : state.isLoading ? (
    <Loading />
  ) : (
    state.isSearchMood && <NotFound backClick={props.deleteSearch} />
  );
}
