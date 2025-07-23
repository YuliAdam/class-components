import styles from './header.module.scss';
import Pokemon from '../../assets/img/pokemon';

export default function Header() {
  return (
    <header className={styles.header}>
      <Pokemon className={styles.header_title} />
    </header>
  );
}
