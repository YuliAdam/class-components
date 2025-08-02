import { Suspense } from 'react';
import styles from './pages.module.scss';
import { Link, Outlet } from 'react-router';
import { PATH } from '../configs/routesConfig';
import Loading from '../components/loading/Loading';
import { WishIcon } from '../components/wishList/WishIcon';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
export default function Main() {
  const isDarkTheme = useSelector((state: RootState) => state.themes.isDark);
  return (
    <>
      <nav>
        <Link to={PATH.about}>
          <div className={`${styles.about} ${isDarkTheme ? styles.dark : ''}`}>
            About
          </div>
        </Link>
        <WishIcon />
      </nav>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
