import { useEffect, useState } from 'react';
import styles from './card.module.scss';
import type { IObjectInfoResponse } from '../../types/types';
import PokemonCard from './PokemonCard';
import Pagination from '../pagination/Pagination';
import isValidRequestString from '../../utils/isValidRequestString';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router';
import { replacePathParams } from '../../utils/replacePathParams';
import { PATH } from '../../configs/routesConfig';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { changePageSlice, setPage } from '../../store/slices/pageSlice';
import { setItem, setLoadingItem } from '../../store/slices/itemSlice';
import {
  useGetAllRequestQuery,
  useGetByNameOrIndexRequestQuery,
} from '../../api/apiSlice';
import { requestOptions } from '../../configs/apiConfig';
import {
  itemSelector,
  pageNumberSelector,
  searchValueSelector,
} from '../../store/selectors';
import { url } from '../../configs/apiConfig';
import {
  getPokemonsFromAbilityOrTypeResponse,
  parsePokemonObj,
} from '../../api/apiMethods';

interface State {
  items: IObjectInfoResponse[];
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
  const {
    data: pokemonsAtPageResponse,
    isLoading: pageIsLoading,
    isError: isPageError,
    error,
  } = useGetAllRequestQuery(
    search
      ? null
      : {
          option: requestOptions.pokemon,
          params: {
            limit: ITEMS_AT_PAGE,
            offset: (!state.isSearchMood ? page : 0) * ITEMS_AT_PAGE,
          },
        }
  );

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

  const isErrorSearch =
    isNameErrorRequest && isAbilityErrorRequest && isTypeErrorRequest;

  useEffect(() => {
    if (search && isErrorSearch) {
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
  }, [isErrorSearch]);

  useEffect(() => {
    try {
      if (!search) {
        if (!pageIsLoading && pokemonsAtPageResponse) {
          if (isPageError) {
            throw error;
          }
          setState({
            items: pokemonsAtPageResponse.results,
            isSearchMood: false,
            isLoading: false,
          });
          navigate(
            replacePathParams(PATH.pokemonParams, {
              page: (page + 1).toString(),
            }),
            {
              replace: true,
            }
          );
        }
      } else {
        updateCards();
        navigate(
          replacePathParams(PATH.pokemonParams, {
            page: (page + 1).toString(),
            searchParam: search,
          }),
          { replace: true }
        );
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
    pageIsLoading,
    nameIsLoading,
    abilityIsLoading,
    typeIsLoading,
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

  function getPokemonsIfSearch() {
    const pokemon =
      !nameIsLoading &&
      !isNameErrorRequest &&
      pokemonsByNameResponse &&
      pokemonsByNameResponse;
    const pokemonsByAbility =
      !isAbilityErrorRequest &&
      !abilityIsLoading &&
      pokemonsByAbilityResponse &&
      getPokemonsFromAbilityOrTypeResponse(pokemonsByAbilityResponse);
    const pokemonsByType =
      !isTypeErrorRequest &&
      !typeIsLoading &&
      pokemonsByTypeResponse &&
      getPokemonsFromAbilityOrTypeResponse(pokemonsByTypeResponse);
    return pokemon || pokemonsByAbility || pokemonsByType;
  }

  async function updateCards() {
    try {
      setLoadingMood();
      if (isValidRequestString(search)) {
        const pokemons = getPokemonsIfSearch();
        if (pokemons) {
          if (!Array.isArray(pokemons)) {
            setState({
              items: [
                {
                  name: pokemons.name,
                  url: url
                    .concat(requestOptions.pokemon)
                    .concat(`/${pokemons.id}`),
                },
              ],
              isSearchMood: true,
              isLoading: false,
            });
          } else {
            setState({
              items: pokemons,
              isSearchMood: true,
              isLoading: false,
            });
          }
          dispatch(setPage(0));
        }
      } else {
        setState({
          items: pokemonsAtPageResponse.results,
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
    return (
      state.items &&
      state.items.map((item, i) => {
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
      })
    );
  }

  function selectItem(item: IObjectInfoResponse) {
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
      if (selectedPokemon) parsePokemonObj(selectedPokemon);
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

  return state.isLoading ||
    !state.items ||
    state.items.length === 0 ||
    pageIsLoading ||
    nameIsLoading ||
    abilityIsLoading ||
    typeIsLoading ? (
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
