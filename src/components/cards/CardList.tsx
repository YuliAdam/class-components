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
import { changePageSlice, setPage } from '../../store/slices/pageSlice';
import { setItem, setLoadingItem } from '../../store/slices/itemSlice';
import {
  getPokemonAtPage,
  getPokemonByAbilityOrType,
  getPokemonBySearch,
} from '../../api/apiMethods';
import {
  useGetAllRequestQuery,
  useGetByNameOrIndexRequestQuery,
} from '../../api/apiSlice';
import { requestOptions } from '../../api/apiRequests';
import {
  itemSelector,
  pageNumberSelector,
  searchValueSelector,
} from '../../store/selectors';

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
  const search = useSelector(searchValueSelector);
  const page = useSelector(pageNumberSelector);
  const item = useSelector(itemSelector);
  const dispatch = useDispatch();
  const { data: pokemonsAtPageResponse, isLoading: pageIsLoading } =
    useGetAllRequestQuery({
      option: requestOptions.pokemon,
      params: {
        limit: ITEMS_AT_PAGE,
        offset: (!state.isSearchMood ? page : 0) * ITEMS_AT_PAGE,
      },
    });

  const {
    currentData: pokemonsByTypeResponse,
    isLoading: typeIsLoading,
    isError: isTypeErrorRequest,
  } = useGetByNameOrIndexRequestQuery({
    option: requestOptions.type,
    param: search,
  });

  const {
    currentData: pokemonsByNameResponse,
    isLoading: nameIsLoading,
    isError: isNameErrorRequest,
  } = useGetByNameOrIndexRequestQuery({
    option: requestOptions.pokemon,
    param: search,
  });

  const {
    currentData: pokemonsByAbilityResponse,
    isLoading: abilityIsLoading,
    isError: isAbilityErrorRequest,
  } = useGetByNameOrIndexRequestQuery({
    option: requestOptions.ability,
    param: search,
  });

  const { currentData: selectedPokemon, isLoading: selectedPokemonIsLoading } =
    useGetByNameOrIndexRequestQuery({
      option: requestOptions.pokemon,
      param: item.value?.name || '',
    });

  useEffect(() => {
    if (
      isNameErrorRequest &&
      isAbilityErrorRequest &&
      isTypeErrorRequest &&
      search
    ) {
      setState({
        items: [],
        isSearchMood: true,
        isLoading: false,
      });
      navigate(
        replacePathParams(PATH.pokemonNotFoundParams, {
          searchParam: search,
          page: (page + 1).toString(),
        }),
        { replace: true }
      );
    }
  }, [isNameErrorRequest && isAbilityErrorRequest && isTypeErrorRequest]);

  useEffect(() => {
    try {
      if (!getSearchValueFromLocalStorage() && !pageIsLoading) {
        getPokemonAtPage(pokemonsAtPageResponse).then((res) => {
          setState({
            items: res,
            isSearchMood: false,
            isLoading: false,
          });
        });
        navigate(
          replacePathParams(PATH.pokemonParams, {
            page: (page + 1).toString(),
          }),
          {
            replace: true,
          }
        );
      } else {
        updateCards().then(() => {
          navigate(
            replacePathParams(PATH.pokemonParams, {
              page: (page + 1).toString(),
              searchParam: search,
            }),
            { replace: true }
          );
        });
      }
    } catch (err) {
      if (err instanceof Error) generateError(err.message);
    }
  }, [
    localStorageState,
    search,
    pokemonsAtPageResponse,
    pokemonsByAbilityResponse,
    pokemonsByNameResponse,
    pokemonsByTypeResponse,
  ]);

  function generateError(message: string) {
    console.log(message);
    setError(true);
  }

  function setLoadingMood() {
    setState({
      items: state.items,
      isSearchMood: state.isSearchMood,
      isLoading: true,
    });
  }

  async function updateCards() {
    try {
      setLoadingMood();
      if (isValidRequestString(search)) {
        const pokemon =
          !nameIsLoading &&
          !isNameErrorRequest &&
          pokemonsByNameResponse &&
          getPokemonBySearch(pokemonsByNameResponse);
        if (pokemon) {
          setState({
            items: [pokemon],
            isSearchMood: true,
            isLoading: false,
          });
        } else {
          const pokemonsByAbility =
            !isAbilityErrorRequest &&
            !abilityIsLoading &&
            pokemonsByAbilityResponse &&
            (await getPokemonByAbilityOrType(pokemonsByAbilityResponse));
          const pokemonsByAbilityOrType =
            pokemonsByAbility ||
            (!isTypeErrorRequest &&
              !typeIsLoading &&
              pokemonsByTypeResponse &&
              (await getPokemonByAbilityOrType(pokemonsByTypeResponse)));
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
                page: (page + 1).toString(),
              }),
              { replace: true }
            );
          }
          dispatch(setPage(0));
        }
      } else {
        getPokemonAtPage(pokemonsAtPageResponse).then((res) => {
          setState({
            items: res,
            isSearchMood: false,
            isLoading: false,
          });
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
      dispatch(setItem(item));
      getPokemonBySearch(selectedPokemon);
      setTimeout(() => {
        if (!selectedPokemonIsLoading) dispatch(setLoadingItem(false));
      }, 300);
    };
  }

  function generateErrorIfHasError() {
    if (hasError) {
      throw Error('Error');
    }
  }

  return state.isLoading || state.items.length === 0 ? (
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
