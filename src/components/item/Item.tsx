import { useContext, useEffect, useState } from 'react';
import PokemonCard from '../cards/PokemonCard';
import { ItemContext } from '../../pages/Main';
import styles from './item.module.scss';
import { Link } from 'react-router';
import { PATH } from '../../configs/routesConfig';
import Loading from '../loading/Loading';

export default function Item() {
  const item = useContext(ItemContext);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(
      item && item.value
        ? !item.value.name &&
            !item.value.color &&
            !item.value.img &&
            !item.value.abilities.length &&
            !item.value.types.length
        : false
    );
  }, [item?.value]);
  return (
    <div className={styles.item}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
