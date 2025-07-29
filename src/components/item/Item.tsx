import PokemonCard from '../cards/PokemonCard';
import styles from './item.module.scss';
import { Link } from 'react-router';
import { PATH } from '../../configs/routesConfig';
import Loading from '../loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { replacePathParams } from '../../utils/replacePathParams';
import { setItem } from '../../store/slices/itemSlice';

export default function Item() {
  const page = useSelector((state: RootState) => state.page.value);
  const search = useSelector((state: RootState) => state.search.value);
  const item = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();

  return (
    <div className={styles.item}>
      {item.isLoading ? (
        <Loading />
      ) : (
        <>
          {item.value && (
            <PokemonCard
              pokemon={item.value}
              onClick={() => {}}
              className={styles.double}
            />
          )}
          <Link
            to={replacePathParams(PATH.pokemonParams, {
              page: `${page + 1}`,
              searchParam: search,
            })}
            replace
          >
            <button
              className={styles.item_close}
              onClick={() => dispatch(setItem(null))}
            >
              Close
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
