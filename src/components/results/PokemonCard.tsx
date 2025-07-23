import { useEffect, useState } from 'react';
import styles from './results.module.scss';
import type { IPokemon } from '../../types/types';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import getRandomColor from '../../utils/getRandomColor';

interface Props {
  pokemon: IPokemon;
}

export default function PokemonCard(props: Props) {
  const [color, setColor] = useState('');
  useEffect(() => setColor(getRandomColor()), []);
  return (
    <div className={styles.pokemon} style={{ backgroundColor: color }}>
      <h1 className={styles.pokemon_title}>
        {capitalizeFirstLetter(props.pokemon.name)}
      </h1>
      <img
        className={styles.pokemon_img}
        src={props.pokemon.img}
        alt="pokemon img"
      />
      <div className={styles.pokemon_info}>
        <div>
          <span className={styles.pokemon_subtitle}>Ability</span>
          <span
            className={styles.pokemon_text}
          >{`: ${props.pokemon.abilities.join(', ')}`}</span>
        </div>
        <div>
          <span className={styles.pokemon_subtitle}>Type</span>
          <span
            className={styles.pokemon_text}
          >{`: ${props.pokemon.types.join(', ')}`}</span>
        </div>
      </div>
    </div>
  );
}
