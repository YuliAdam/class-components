import { useContext } from 'react';
import PokemonCard from '../cards/PokemonCard';
import { ItemContext } from '../../pages/Main';
import styles from './item.module.scss';
import { Link } from 'react-router';
import { PATH } from '../../configs/routesConfig';

export default function Item() {
  const item = useContext(ItemContext);
  return (
    <div className={styles.item}>
      {item && item.value && (
        <PokemonCard
          pokemon={item.value}
          onClick={() => {}}
          className={styles.double}
        />
      )}
      <Link to={PATH.pokemonParams} replace>
        <button
          className={styles.item_close}
          onClick={() => item?.setValue(null)}
        >
          Close
        </button>
      </Link>
    </div>
  );
}
