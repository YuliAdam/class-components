import React from 'react';
import styles from './results.module.scss';
import {
  getAllRequest,
  getByNameOrIndexRequest,
  requestOptions,
} from '../../service/api';
import type {
  IAllPokemonResponse,
  IObjectInfoResponse,
  IPokemon,
  IPokemonResponse,
} from '../../types/types';
import PokemonCard from './PokemonCard';
import Pagination from '../pagination/Pagination';
import NotFound from '../notFound/NotFound';
import isValidRequestString from '../../utils/isValidRequestString';

interface State {
  items: IPokemon[];
  page: number;
  isSearchMood: boolean;
}

interface Props {
  searchValue: string;
  deleteSearch: () => void;
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
  };

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

  async componentDidMount() {
    this.setState({
      items: await this.getPokemonRequest(this.state.page),
      page: this.state.page,
      isSearchMood: false,
    });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.searchValue !== this.props.searchValue) {
      if (isValidRequestString(this.props.searchValue)) {
        console.log('update');
        const pokemon = await this.getPokemonBySearchRequest(
          this.props.searchValue
        );
        if (pokemon) {
          this.setState({
            items: [pokemon],
            page: 0,
            isSearchMood: true,
          });
        } else {
          this.setState({
            items: [],
            page: 0,
          });
        }
      } else {
        console.log('else update', this.props.searchValue);
        this.setState({
          items: await this.getPokemonRequest(0),
          page: 0,
          isSearchMood: false,
        });
      }
    }
  }

  prevClick = async () => {
    if (this.state.page) {
      this.setState({
        items: await this.getPokemonRequest(this.state.page - 1),
        page: this.state.page - 1,
      });
    }
  };

  nextClick = async () => {
    this.setState({
      items: await this.getPokemonRequest(this.state.page + 1),
      page: this.state.page + 1,
    });
  };

  getBackButtonIfSearch() {
    return (
      this.state.isSearchMood && (
        <button className={styles.result_btn} onClick={this.props.deleteSearch}>
          Back
        </button>
      )
    );
  }

  hasNextPage() {
    return this.state.items.length >= ITEMS_AT_PAGE;
  }

  render() {
    return this.state.items.length !== 0 ? (
      <>
        <section
          className={
            this.state.items.length === 1 ? styles.result : styles.results
          }
        >
          {this.getBackButtonIfSearch()}
          {this.state.items.map((item) => (
            <PokemonCard key={item.name} pokemon={item} />
          ))}
        </section>
        <Pagination
          pageNum={this.state.page + 1}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          hasNextPage={this.hasNextPage()}
        />
      </>
    ) : (
      <NotFound backClick={this.props.deleteSearch} />
    );
  }
}
