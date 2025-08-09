import styles from './card.module.scss';
import type { IPokemon } from '../../types/types';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInWishList,
  removeFromWishList,
} from '../../store/slices/wishListSlice';
import { useRef } from 'react';
import Heart from '../../assets/img/heart';
import { wishListSelector } from '../../store/selectors';

interface Props {
  pokemon: IPokemon;
  onClick: (item: IPokemon) => void;
  className?: string;
}

export default function PokemonCard({ pokemon, onClick, className }: Props) {
  const wishList = useSelector(wishListSelector);
  const dispatch = useDispatch();
  const iconRef = useRef<HTMLInputElement>(null);

  function toggleWishList(pokemon: IPokemon) {
    if (wishList.value.includes(pokemon.id)) {
      dispatch(removeFromWishList(pokemon.id));
    } else {
      dispatch(addInWishList(pokemon));
    }
  }

  function clickCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      e.target !== iconRef.current &&
      e.target !== iconRef.current?.children[0] &&
      e.target !== iconRef.current?.children[0].children[0]
    ) {
      onClick(pokemon);
    }
  }

  return (
    <div
      className={`${styles.pokemon} ${className || ''}`}
      style={{ backgroundColor: pokemon.color }}
      onClick={(e) => clickCard(e)}
    >
      <h1 className={styles.pokemon_title}>
        {capitalizeFirstLetter(pokemon.name)}
      </h1>
      <img className={styles.pokemon_img} src={pokemon.img} alt="pokemon img" />
      <div ref={iconRef} onClick={() => toggleWishList(pokemon)}>
        <Heart
          className={`${styles.pokemon_icon} ${wishList.value.includes(pokemon.id) ? styles.selected : ''}`}
        />
      </div>

      <div className={styles.pokemon_info}>
        <div>
          <span className={styles.pokemon_subtitle}>Ability</span>
          <span
            className={styles.pokemon_text}
          >{`: ${pokemon.abilities.join(', ')}`}</span>
        </div>
        <div>
          <span className={styles.pokemon_subtitle}>Type</span>
          <span
            className={styles.pokemon_text}
          >{`: ${pokemon.types.join(', ')}`}</span>
        </div>
      </div>
    </div>
  );
}
