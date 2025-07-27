import { useContext } from 'react';
import PokemonCard from '../results/PokemonCard';
import { ItemContext } from '../Main';
import styles from './item.module.scss';

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
      <button
        className={styles.item_close}
        onClick={() => item?.setValue(null)}
      >
        Close
      </button>
    </div>
  );
}
