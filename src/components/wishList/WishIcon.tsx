import styles from './wishList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Heart from '../../assets/img/heart';
import HeartOff from '../../assets/img/heartOff';
import Download from '../../assets/img/download';
import { clearWishList } from '../../store/slices/wishListSlice';
import { useRef } from 'react';
import saveFile from '../../fileSystem/saveFail';

export function WishIcon() {
  const wishList = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  return wishList.value.length ? (
    <div className={styles.wish_list}>
      <div
        className={styles.wish_list_wrap}
        onClick={() => dispatch(clearWishList())}
      >
        <HeartOff className={styles.wish_list_icon} />
      </div>
      <div className={styles.wish_list_wrap}>
        <Heart className={styles.wish_list_num} />
        <span className={styles.wish_list_text}>
          {wishList.value.length || ''}
        </span>
      </div>
      <div className={styles.wish_list_wrap}>
        <a
          ref={downloadRef}
          onClick={() =>
            saveFile(
              `${wishList.value.length}_pokemon`,
              JSON.stringify(wishList.pokemons),
              downloadRef.current
            )
          }
        >
          <Download className={styles.wish_list_icon} />
        </a>
      </div>
    </div>
  ) : (
    ''
  );
}
