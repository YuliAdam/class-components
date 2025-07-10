import React from 'react';
import styles from './results.module.scss';
import {
  getAllRequest,
  getByNameOrIndexRequest,
  requestOptions,
} from '../../service/api';
import type {
  IAbilityResponse,
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
}

const ITEMS_AT_PAGE = 15;

async function getPokemonObj(pokemon: IPokemonResponse) {
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

export default class Results extends React.Component<Props> {
  public state: State = {
    items: [],
    page: 0,
    isSearchMood: false,
    isLoading: true,
  };

  setLoadingMood() {
    this.setState({
      items: [],
      page: this.state.page,
      isSearchMood: this.state.isSearchMood,
      isLoading: true,
    });
  }

  async getPokemonRequest(page: number) {
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

  async getPokemonBySearchRequest(name: string) {
    const result: IPokemonResponse = await getByNameOrIndexRequest(
      requestOptions.pokemon,
      name
    );
    return result && getPokemonObj(result);
  }

  async getPokemonByAbilityOrTypeRequest(searchStr: string) {
    const result: IAbilityResponse =
      (await getByNameOrIndexRequest(requestOptions.ability, searchStr)) ??
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

  async componentDidMount() {
    if (!getSearchValueFromLocalStorage()) {
      this.setState({
        items: await this.getPokemonRequest(this.state.page),
        page: this.state.page,
        isSearchMood: false,
        isLoading: true,
      });
    } else {
      await this.updateCards();
    }
  }

  async updateCards() {
    this.setLoadingMood();
    if (isValidRequestString(this.props.searchValue)) {
      const pokemon = await this.getPokemonBySearchRequest(
        this.props.searchValue
      );
      if (pokemon) {
        this.setState({
          items: [pokemon],
          page: 0,
          isSearchMood: true,
          isLoading: false,
        });
      } else {
        const pokemonsByAbilityOrType =
          await this.getPokemonByAbilityOrTypeRequest(this.props.searchValue);
        if (pokemonsByAbilityOrType) {
          this.setState({
            items: pokemonsByAbilityOrType,
            page: 0,
            isSearchMood: true,
            isLoading: false,
          });
        } else {
          this.setState({
            items: [],
            page: 0,
            isSearchMood: true,
            isLoading: false,
          });
        }
      }
    } else {
      console.log('else update', this.props.searchValue);
      this.setState({
        items: await this.getPokemonRequest(0),
        page: 0,
        isSearchMood: false,
        isLoading: false,
      });
    }
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.searchValue !== this.props.searchValue) {
      await this.updateCards();
    }
  }

  prevClick = async () => {
    if (this.state.page) {
      this.changePage(-1);
    }
  };

  nextClick = async () => this.changePage(+1);

  async changePage(num: number) {
    this.setLoadingMood();
    if (!this.state.isSearchMood) {
      this.setState({
        items: await this.getPokemonRequest(this.state.page + num),
        page: this.state.page + num,
        isSearchMood: false,
        isLoading: false,
      });
    } else {
      const copyItems = this.state.items.slice();
      this.setLoadingMood();
      setTimeout(() => {
        this.setState((prevState: State) => ({
          items: copyItems,
          page: prevState.page + num,
          isSearchMood: true,
          isLoading: false,
        }));
      }, 300);
    }
  }

  hasNextPage() {
    return this.state.isSearchMood
      ? this.state.items.length > ITEMS_AT_PAGE * (this.state.page + 1)
      : this.state.items.length >= ITEMS_AT_PAGE;
  }

  getPokemonCards() {
    return this.state.items.map((item, i) => {
      if (
        this.state.items.length <= ITEMS_AT_PAGE ||
        (i >= this.state.page * ITEMS_AT_PAGE &&
          i < (this.state.page + 1) * ITEMS_AT_PAGE)
      ) {
        return <PokemonCard key={item.name} pokemon={item} />;
      }
    });
  }

  render() {
    if (this.props.hasError) {
      throw Error('my test error');
    }
    return this.state.items.length !== 0 ? (
      <>
        <section
          className={
            this.state.items.length === 1 ? styles.result : styles.results
          }
        >
          {this.getPokemonCards()}
        </section>
        <Pagination
          pageNum={this.state.page + 1}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          hasNextPage={this.hasNextPage()}
        />
      </>
    ) : this.state.isLoading ? (
      <Loading />
    ) : (
      this.state.isSearchMood && (
        <NotFound backClick={this.props.deleteSearch} />
      )
    );
  }
}
