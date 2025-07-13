import React from 'react';
import styles from './results.module.scss';
import type { IPokemon } from '../../types/types';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import getRandomColor from '../../utils/getRandomColor';

interface Props {
  pokemon: IPokemon;
}

interface State {
  color: string;
}

export default class PokemonCard extends React.Component<Props> {
  public state: State = {
    color: '',
  };

  componentDidMount(): void {
    this.setState({ color: getRandomColor() });
  }

  render() {
    return (
      <div
        className={styles.pokemon}
        style={{ backgroundColor: this.state.color }}
      >
        <h1 className={styles.pokemon_title}>
          {capitalizeFirstLetter(this.props.pokemon.name)}
        </h1>
        <img
          className={styles.pokemon_img}
          src={this.props.pokemon.img}
          alt="pokemon img"
        />
        <div className={styles.pokemon_info}>
          <div>
            <span className={styles.pokemon_subtitle}>Ability</span>
            <span
              className={styles.pokemon_text}
            >{`: ${this.props.pokemon.abilities.join(', ')}`}</span>
          </div>
          <div>
            <span className={styles.pokemon_subtitle}>Type</span>
            <span
              className={styles.pokemon_text}
            >{`: ${this.props.pokemon.types.join(', ')}`}</span>
          </div>
        </div>
      </div>
    );
  }
}
