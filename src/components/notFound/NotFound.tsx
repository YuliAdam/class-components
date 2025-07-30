import Pokeball from '../../assets/img/pokeball.svg';
import styles from './notFound.module.scss';
import { setSearchValueInLocalStorage } from '../../localStorage/localStorage';
import { useNavigate } from 'react-router';
import { PATH } from '../../configs/routesConfig';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../store/slices/searchSlice';

export const NOT_FOUND_MESSAGE = 'Pokemon not found';

export default function NotFound() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function backClick() {
    dispatch(setSearch(''));
    setSearchValueInLocalStorage('');
    navigate(PATH.empty);
  }
  return (
    <section className={styles.not_found}>
      <div className={styles.not_found_wrap}>
        <span className={styles.not_found_text}>4</span>
        <img className={styles.not_found_img} src={Pokeball} alt="pokeball" />
        <span className={styles.not_found_text}>4</span>
      </div>
      <p className={styles.not_found_info}>{NOT_FOUND_MESSAGE}</p>
      <button className={styles.not_found_btn} onClick={backClick}>
        Back
      </button>
    </section>
  );
}
