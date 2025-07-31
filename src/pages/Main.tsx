import { Suspense } from 'react';
import styles from './pages.module.scss';
import { Link, Outlet } from 'react-router';
import { PATH } from '../configs/routesConfig';
import Loading from '../components/loading/Loading';
import { WishIcon } from '../components/wishList/WishIcon';
export default function Main() {
  return (
    <>
      <nav>
        <Link to={PATH.about}>
          <div className={styles.about}>About</div>
        </Link>
        <WishIcon />
      </nav>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
