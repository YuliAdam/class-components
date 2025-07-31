import styles from './card.module.scss';
import type { IPokemon } from '../../types/types';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import WishList from '../../assets/img/wishList';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import {
  addInWishList,
  removeFromWishList,
} from '../../store/slices/wishListSlice';
import { useRef } from 'react';

interface Props {
  pokemon: IPokemon;
  onClick: (item: IPokemon) => void;
  className?: string;
}

export default function PokemonCard({ pokemon, onClick, className }: Props) {
  const wishList = useSelector((state: RootState) => state.wishList.value);
  const dispatch = useDispatch();
  const iconRef = useRef<HTMLInputElement>(null);

  function toggleWishList(id: number) {
    if (wishList.includes(`${id}`)) {
      dispatch(removeFromWishList(`${id}`));
    } else {
      dispatch(addInWishList(`${id}`));
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
      <div ref={iconRef} onClick={() => toggleWishList(pokemon.id)}>
        <WishList
          className={`${styles.pokemon_icon} ${wishList.includes(`${pokemon.id}`) ? styles.selected : ''}`}
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
