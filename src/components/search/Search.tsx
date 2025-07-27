import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import Input from './Input';
import SearchIcon from '../../assets/img/searchIcon';
import styles from './search.module.scss';
import { ItemContext, PageContext, SearchContext } from '../Main';
import { Link, useNavigate } from 'react-router';
import { PATH } from '../../configs/routesConfig';
import { replacePathParams } from '../../utils/replacePathParams';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  getSearchValueFromLocalStorage,
  setSearchValueInLocalStorage,
} from '../../localStorage/localStorage';

export default function Search() {
  const search = useContext(SearchContext);
  const page = useContext(PageContext);
  const [value, setValue] = useState(search?.value || '');
  const navigate = useNavigate();
  const item = useContext(ItemContext);
  const setLocalStorage = useLocalStorage(
    getSearchValueFromLocalStorage()
  )[1] as (action: string) => void;

  useEffect(() => setValue(search?.value || ''), [search?.value]);

  function submitInput(text: string) {
    search?.setValue(text.trim());
    setValue(text.trim());
    setLocalStorage(text.trim());
    setSearchValueInLocalStorage(text.trim());
    page?.setValue(0);
    item?.setValue(null);
  }

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement) {
      const text = e.target.value;
      setValue(text);
      if (!text.trim()) {
        submitInput(text);
        navigate(replacePathParams(PATH.page, { page: '1' }));
      }
    }
  }

  function keyDownInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement && e.key === 'Enter') {
      const text = e.target.value.trim();
      submitInput(text);
      navigate(
        replacePathParams(PATH.searchParam, { page: '1', searchParam: text })
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
            replacePathParams(PATH.searchParam, {
              page: '1',
              searchParam: value,
            })
          }
        >
          <SearchIcon
            className={styles.search_icon}
            onClick={() => value && submitInput(value)}
          />
        </Link>
      </div>
    </section>
  );
}
