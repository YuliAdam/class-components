import styles from './card.module.scss';
import type { IObjectInfoResponse, IPokemon } from '../../types/types';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInWishList,
  removeFromWishList,
} from '../../store/slices/wishListSlice';
import { useEffect, useRef, useState } from 'react';
import Heart from '../../assets/img/heart';
import { wishListSelector } from '../../store/selectors';
import { useGetPokemonByUrlQuery } from '../../api/apiSlice';
import { parsePokemonObj } from '../../api/apiMethods';

interface Props {
  pokemon: IObjectInfoResponse;
  onClick: (item: IObjectInfoResponse) => void;
  className?: string;
}

export default function PokemonCard({ pokemon, onClick, className }: Props) {
  const wishList = useSelector(wishListSelector);
  const dispatch = useDispatch();
  const iconRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<IPokemon | null>(null);
  const { currentData, isLoading, isError } = useGetPokemonByUrlQuery(
    pokemon.url
  );

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

  useEffect(() => {
    if (!isLoading && !isError) setState(parsePokemonObj(currentData));
  }, [currentData]);

  return (
    state && (
      <div
        className={`${styles.pokemon} ${className || ''}`}
        style={{ backgroundColor: state.color }}
        onClick={(e) => clickCard(e)}
      >
        <h1 className={styles.pokemon_title}>
          {capitalizeFirstLetter(state.name)}
        </h1>
        <img className={styles.pokemon_img} src={state.img} alt="pokemon img" />
        <div ref={iconRef} onClick={() => toggleWishList(state)}>
          <Heart
            className={`${styles.pokemon_icon} ${wishList.value.includes(state.id) ? styles.selected : ''}`}
          />
        </div>

        <div className={styles.pokemon_info}>
          <div>
            <span className={styles.pokemon_subtitle}>Ability</span>
            <span
              className={styles.pokemon_text}
            >{`: ${state.abilities.join(', ')}`}</span>
          </div>
          <div>
            <span className={styles.pokemon_subtitle}>Type</span>
            <span
              className={styles.pokemon_text}
            >{`: ${state.types.join(', ')}`}</span>
          </div>
        </div>
      </div>
    )
  );
}
