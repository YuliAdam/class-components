import { Suspense } from 'react';
import styles from './pages.module.scss';
import { Link, Outlet } from 'react-router';
import { PATH } from '../configs/routesConfig';
import Loading from '../components/loading/Loading';

export default function Main() {
  return (
    <>
      <Link to={PATH.about}>
        <div className={styles.about}>About</div>
      </Link>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
