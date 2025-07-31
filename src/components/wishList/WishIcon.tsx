import { Link } from 'react-router';
import { PATH } from '../../configs/routesConfig';
import WishList from '../../assets/img/wishList';
import styles from './wishList.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export function WishIcon() {
  const wishList = useSelector((state: RootState) => state.wishList.value);
  return (
    <Link to={PATH.empty}>
      <div className={styles.wish_list}>
        <WishList className={styles.wish_list_icon} />
        <span className={styles.wish_list_text}>{wishList.length || ''}</span>
      </div>
    </Link>
  );
}
