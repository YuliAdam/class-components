import React, { Suspense, useState } from 'react';
import { getSearchValueFromLocalStorage } from '../localStorage/localStorage';
import type { IPokemon } from '../types/types';
import styles from './pages.module.scss';
import { Link, Outlet } from 'react-router';
import { PATH } from '../configs/routesConfig';
import Loading from '../components/loading/Loading';

interface ISearchContext {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
export interface IPageContext {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
export interface IItemContext {
  value: IPokemon | null;
  setValue: React.Dispatch<React.SetStateAction<IPokemon | null>>;
}

export const SearchContext = React.createContext<ISearchContext | undefined>(
  undefined
);
export const PageContext = React.createContext<IPageContext | undefined>(
  undefined
);
export const ItemContext = React.createContext<IItemContext | undefined>(
  undefined
);

export default function Main() {
  const [searchValue, setSearchValue] = useState(
    getSearchValueFromLocalStorage()
  );
  const [page, setPage] = useState(0);
  const [item, setItem] = useState<IPokemon | null>(null);
  return (
    <SearchContext.Provider
      value={{ value: searchValue, setValue: setSearchValue }}
    >
      <PageContext.Provider value={{ value: page, setValue: setPage }}>
        <ItemContext.Provider value={{ value: item, setValue: setItem }}>
          <Link to={PATH.about}>
            <div className={styles.about}>About</div>
          </Link>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </ItemContext.Provider>
      </PageContext.Provider>
    </SearchContext.Provider>
  );
}
