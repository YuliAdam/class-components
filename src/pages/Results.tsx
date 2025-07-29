import { Suspense } from 'react';
import CardList from '../components/cards/CardList';
import ErrorBoundary from '../components/error/ErrorBoundary';
import Search from '../components/search/Search';
import Loading from '../components/loading/Loading';
import { Outlet } from 'react-router';
import styles from './pages.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function Results() {
  const item = useSelector((state: RootState) => state.item.value);
  return (
    <>
      <div className={item ? styles.container : ''}>
        <div className={item ? styles.container_main : ''}>
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
