import PokemonCard from '../cards/PokemonCard';
import styles from './item.module.scss';
import { Link } from 'react-router';
import { PATH } from '../../configs/routesConfig';
import Loading from '../loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { replacePathParams } from '../../utils/replacePathParams';
import { setItem } from '../../store/slices/itemSlice';
import {
  itemSelector,
  pageNumberSelector,
  searchValueSelector,
} from '../../store/selectors';

export default function Item() {
  const page = useSelector(pageNumberSelector);
  const search = useSelector(searchValueSelector);
  const item = useSelector(itemSelector);
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
