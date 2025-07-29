import { Suspense, useContext } from 'react';
import CardList from '../components/cards/CardList';
import ErrorBoundary from '../components/error/ErrorBoundary';
import Search from '../components/search/Search';
import Loading from '../components/loading/Loading';
import { Outlet } from 'react-router';
import { ItemContext } from './Main';
import styles from './pages.module.scss';

export default function Results() {
  const item = useContext(ItemContext);
  return (
    <>
      <div className={item?.value ? styles.container : ''}>
        <div className={item?.value ? styles.container_main : ''}>
          <Search />
          <ErrorBoundary fallback={<CardList />} />
        </div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
