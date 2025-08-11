import styles from './header.module.scss';
import Pokemon from '../../assets/img/pokemon';
import { useDispatch, useSelector } from 'react-redux';
import Moon from '../../assets/img/moon';
import Sun from '../../assets/img/sun';
import { toggleTheme } from '../../store/slices/themesSlice';
import { isDarkThemeSelector } from '../../store/selectors';

export default function Header() {
  const isDarkTheme = useSelector(isDarkThemeSelector);
  const dispatch = useDispatch();

  function getTheme() {
    return isDarkTheme ? (
      <Moon className={styles.moon} />
    ) : (
      <Sun className={styles.sun} />
    );
  }

  function changeTheme() {
    document.documentElement.classList.toggle('dark');
    dispatch(toggleTheme());
  }

  return (
    <header className={styles.header}>
      <Pokemon
        className={`${styles.header_title} ${isDarkTheme ? styles.dark : ''}`}
      />
      <div onClick={changeTheme}> {getTheme()}</div>
    </header>
  );
}
