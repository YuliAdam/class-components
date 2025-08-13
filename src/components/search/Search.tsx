import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
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
import { setItem, setLoadingItem } from '../../store/slices/itemSlice';
import {
  isDarkThemeSelector,
  itemSelector,
  searchValueSelector,
} from '../../store/selectors';
import { pokemonApiSlice } from '../../api/apiSlice';

export default function Search() {
  const search = useSelector(searchValueSelector);
  const isDarkTheme = useSelector(isDarkThemeSelector);
  const selectedItem = useSelector(itemSelector);
  const dispatch = useDispatch();
  const [value, setValue] = useState(search);
  const navigate = useNavigate();
  const setLocalStorage = useLocalStorage()[1];
  const loadingRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (loadingRef.current) clearTimeout(loadingRef.current);
    },
    []
  );

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

  function invalidCache() {
    dispatch(pokemonApiSlice.util.resetApiState());
    if (selectedItem.value) {
      dispatch(setLoadingItem(true));
      loadingRef.current = setTimeout(() =>
        dispatch(setLoadingItem(false), 1000)
      );
    }
  }

  return (
    <section
      className={`${styles.search} ${selectedItem.value ? styles.half_screen : ''}`}
    >
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
      </div>
      <button
        className={`${styles.clear_cache} ${selectedItem.value ? styles.half_screen : ''}`}
        onClick={invalidCache}
      >
        Invalid cache
      </button>
    </section>
  );
}
