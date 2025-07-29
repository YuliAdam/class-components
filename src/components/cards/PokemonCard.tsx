import styles from './card.module.scss';
import type { IPokemon } from '../../types/types';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

interface Props {
  pokemon: IPokemon;
  onClick: (item: IPokemon) => void;
  className?: string;
}

export default function PokemonCard(props: Props) {
  return (
    <div
      className={`${styles.pokemon} ${props.className || ''}`}
      style={{ backgroundColor: props.pokemon.color }}
      onClick={() => props.onClick(props.pokemon)}
    >
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
