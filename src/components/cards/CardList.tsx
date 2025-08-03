import { useEffect, useState } from 'react';
import styles from './card.module.scss';
import type { IPokemon } from '../../types/types';
import PokemonCard from './PokemonCard';
import Pagination from '../pagination/Pagination';
import isValidRequestString from '../../utils/isValidRequestString';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router';
import { replacePathParams } from '../../utils/replacePathParams';
import { PATH } from '../../configs/routesConfig';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getSearchValueFromLocalStorage } from '../../localStorage/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { changePageSlice, setPage } from '../../store/slices/pageSlice';
import { setItem, setLoadingItem } from '../../store/slices/itemSlice';
import {
  getPokemonAtPage,
  getPokemonByAbilityOrType,
  getPokemonBySearch,
} from '../../service/apiMethods';

interface State {
  items: IPokemon[];
  isSearchMood: boolean;
  isLoading: boolean;
}

export const ITEMS_AT_PAGE = 15;

const initState: State = {
  items: [],
  isSearchMood: false,
  isLoading: true,
};

export default function CardList() {
  const [state, setState] = useState(initState);
  const [hasError, setError] = useState(false);
  const navigate = useNavigate();
  const localStorageState = useLocalStorage()[0];
  const search = useSelector((state: RootState) => state.search.value);
  const page = useSelector((state: RootState) => state.page.value);
  const item = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (!getSearchValueFromLocalStorage()) {
        getPokemonAtPage(0, ITEMS_AT_PAGE).then((res) => {
          setState({
            items: res,
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
            searchParam: search,
          }),
          { replace: true }
        );
      }
    } catch (err) {
      if (err instanceof Error) generateError(err.message);
    }
  }, [search, localStorageState]);

  function generateError(message: string) {
    console.log(message);
    setError(true);
  }

  function setLoadingMood() {
    setState({
      items: [],
      isSearchMood: state.isSearchMood,
      isLoading: true,
    });
  }

  async function updateCards() {
    try {
      setLoadingMood();
      if (isValidRequestString(search)) {
        const pokemon = await getPokemonBySearch(search);
        if (pokemon) {
          setState({
            items: [pokemon],
            isSearchMood: true,
            isLoading: false,
          });
        } else {
          const pokemonsByAbilityOrType =
            await getPokemonByAbilityOrType(search);
          if (pokemonsByAbilityOrType) {
            setState({
              items: pokemonsByAbilityOrType,
              isSearchMood: true,
              isLoading: false,
            });
          } else {
            setState({
              items: [],
              isSearchMood: true,
              isLoading: false,
            });
            navigate(
              replacePathParams(PATH.pokemonNotFoundParams, {
                searchParam: search,
                page: '1',
              }),
              { replace: true }
            );
          }
          dispatch(setPage(0));
        }
      } else {
        setState({
          items: await getPokemonAtPage(0, ITEMS_AT_PAGE),
          isSearchMood: false,
          isLoading: false,
        });
      }
    } catch (err) {
      if (err instanceof Error) generateError(err.message);
    }
  }

  const prevClick = () => {
    if (page) changePage(-1);
  };

  const nextClick = () => {
    if (hasNextPage()) changePage(+1);
  };

  async function changePage(num: number) {
    dispatch(setItem(null));
    setLoadingMood();
    if (!state.isSearchMood) {
      navigate(
        replacePathParams(PATH.pokemonParams, {
          page: `${page + 1 + num}`,
        }),
        { replace: true }
      );
      setState({
        items: await getPokemonAtPage(page + num, ITEMS_AT_PAGE),
        isSearchMood: false,
        isLoading: false,
      });
    } else {
      navigate(
        replacePathParams(PATH.pokemonParams, {
          page: `${page + 1 + num}`,
          searchParam: search,
        }),
        { replace: true }
      );
      const copyItems = state.items.slice();
      setLoadingMood();
      setTimeout(() => {
        setState({
          items: copyItems,
          isSearchMood: true,
          isLoading: false,
        });
      }, 300);
    }
    dispatch(changePageSlice(num));
  }

  function hasNextPage() {
    return state.isSearchMood
      ? state.items.length > ITEMS_AT_PAGE * (page + 1)
      : state.items.length >= ITEMS_AT_PAGE;
  }

  function getPokemonCards() {
    return state.items.map((item, i) => {
      if (
        state.items.length <= ITEMS_AT_PAGE ||
        (i >= page * ITEMS_AT_PAGE && i < (page + 1) * ITEMS_AT_PAGE)
      ) {
        return (
          <PokemonCard
            key={item.name}
            pokemon={item}
            onClick={selectItem(item)}
          />
        );
      }
    });
  }
  function selectItem(item: IPokemon) {
    return async () => {
      dispatch(setLoadingItem(true));
      navigate(
        replacePathParams(PATH.itemParams, {
          page: `${page + 1}`,
          searchParam: search,
          item: item.name,
        }),
        { replace: true }
      );
      const pokemon = await getPokemonBySearch(item.name);
      dispatch(setItem(pokemon));
    };
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
            : item.value
              ? styles.results_half
              : styles.results
        }
        data-testid="pokemon card wrap"
      >
        {getPokemonCards()}
      </section>
      <Pagination
        pageNum={page + 1}
        prevClick={prevClick}
        nextClick={nextClick}
        hasNextPage={hasNextPage()}
      />
    </>
  );
}
