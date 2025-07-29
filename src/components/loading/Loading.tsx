import Pokeball from '../../assets/img/pokeball.svg';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img className={styles.loading_img} src={Pokeball} alt="loading..." />
    </div>
  );
}
