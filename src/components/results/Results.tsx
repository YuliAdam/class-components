import React from 'react';
import styles from './results.module.scss';
import { getAllRequest, requestOptions } from '../../service/api';
import type {
  IAllPokemonResponse,
  IObjectInfoResponse,
  IPokemon,
  IPokemonResponse,
} from '../../types/types';
import PokemonCard from './PokemonCard';
import Pagination from '../pagination/Pagination';

interface State {
  items: IPokemon[];
  page: number;
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

export default class Results extends React.Component {
  public state: State = {
    items: [],
    page: 0,
  };

  async getPokemonRequest(page: number) {
    console.log(page);
    const result: IAllPokemonResponse = await getAllRequest(
      requestOptions.pokemon,
      { limit: ITEMS_AT_PAGE, offset: page * ITEMS_AT_PAGE }
    );
    console.log(result);
    return await Promise.all(
      result.results.map(async (pokemon: IObjectInfoResponse) => {
        const response = await (await fetch(pokemon.url)).json();
        return getPokemonObj(response);
      })
    );
  }

  async componentDidMount() {
    this.setState({
      items: await this.getPokemonRequest(this.state.page),
      page: this.state.page,
    });
    console.log(this.state);
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

  render() {
    return (
      <>
        <section className={styles.results}>
          {this.state.items.map((item) => (
            <PokemonCard key={item.name} pokemon={item} />
          ))}
        </section>
        <Pagination
          pageNum={this.state.page + 1}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
        />
      </>
    );
  }
}
