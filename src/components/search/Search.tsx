import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import Input from './Input';
import SearchIcon from '../../assets/img/searchIcon';
import styles from './search.module.scss';
import { Link, useNavigate } from 'react-router';
import { PATH } from '../../configs/routesConfig';
import { replacePathParams } from '../../utils/replacePathParams';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../store/slices/searchSlice';
import { setPage } from '../../store/slices/pageSlice';
import { setItem } from '../../store/slices/itemSlice';
import {
  isDarkThemeSelector,
  searchValueSelector,
} from '../../store/selectors';

export default function Search() {
  const search = useSelector(searchValueSelector);
  const isDarkTheme = useSelector(isDarkThemeSelector);
  const dispatch = useDispatch();
  const [value, setValue] = useState(search);
  const navigate = useNavigate();
  const setLocalStorage = useLocalStorage()[1];

  function submitInput(text: string) {
    dispatch(setSearch(text.trim()));
    setValue(text.trim());
    setLocalStorage(text.trim());
    dispatch(setPage(0));
    dispatch(setItem(null));
  }

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement) {
      const text = e.target.value;
      setValue(text);
      if (!text.trim()) {
        submitInput(text);
        navigate(replacePathParams(PATH.pokemonParams, { page: `1` }), {
          replace: true,
        });
      }
    }
  }

  function keyDownInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement && e.key === 'Enter') {
      const text = e.target.value.trim();
      submitInput(text);
      navigate(
        replacePathParams(PATH.pokemonParams, { page: '1', searchParam: text }),
        { replace: true }
      );
    }
  }

  return (
    <section className={styles.search}>
      <div className={styles.search_wrap}>
        <Input
          type="search"
          id="search"
          className={styles.input}
          placeholder="Search"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeInput(e)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => keyDownInput(e)}
        />
        <Link
          to={
            value &&
            replacePathParams(PATH.pokemonParams, {
              page: '1',
              searchParam: value,
            })
          }
          replace
        >
          <SearchIcon
            className={`${styles.search_icon} ${isDarkTheme ? styles.dark : ''}`}
            onClick={() => value && submitInput(value)}
          />
        </Link>
        <button className={styles.clear_cache}>Clear cache</button>
      </div>
    </section>
  );
}
