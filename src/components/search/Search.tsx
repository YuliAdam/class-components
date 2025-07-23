import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import Input from './Input';
import SearchIcon from '../../assets/img/searchIcon';
import styles from './search.module.scss';
import ErrorButton from '../error/ErrorButton';
import { getSearchValueFromLocalStorage } from '../../localStorage/localStorage';

interface Props {
  submitInput: (text: string) => void;
  generateError: () => void;
  hasError: boolean;
}

const initValue = getSearchValueFromLocalStorage();

export default function Search(props: Props) {
  const [value, setValue] = useState(initValue);

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement) {
      const text = e.target.value;
      setValue(text);
      if (!text.trim()) {
        props.submitInput(text);
      }
    }
  }

  function keyDownInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement && e.key === 'Enter') {
      const text = e.target.value.trim();
      props.submitInput(text);
      setValue(text);
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
        <div>
          <SearchIcon
            className={styles.search_icon}
            onClick={() => props.submitInput(value)}
          />
        </div>
      </div>
      <ErrorButton onClick={props.generateError} hasError={props.hasError} />
    </section>
  );
}
