import React, { useState } from 'react';
import Search from './search/Search';
import Results from './results/Results';
import { getSearchValueFromLocalStorage } from '../localStorage/localStorage';
import ErrorBoundary from './error/ErrorBoundary';
import type { IPokemon } from '../types/types';
import styles from './main.module.scss';
import Item from './item/Item';
import { useNavigate } from 'react-router';
import { PATH } from '../configs/routesConfig';

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
  const navigate = useNavigate();
  return (
    <SearchContext.Provider
      value={{ value: searchValue, setValue: setSearchValue }}
    >
      <PageContext.Provider value={{ value: page, setValue: setPage }}>
        <ItemContext.Provider value={{ value: item, setValue: setItem }}>
          <div className={item ? styles.container : ''}>
            <div className={item ? styles.container_main : ''}>
              <button
                className={styles.about}
                onClick={() => navigate(PATH.about)}
              >
                About
              </button>
              <Search />
              <ErrorBoundary fallback={<Results />} />
            </div>
            {item && (
              <div className={styles.container_item}>
                <Item />
              </div>
            )}
          </div>
        </ItemContext.Provider>
      </PageContext.Provider>
    </SearchContext.Provider>
  );
}
