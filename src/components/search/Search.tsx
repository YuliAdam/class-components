import React from 'react';
import Input from '../Input';
import SearchIcon from '../../assets/img/searchIcon';
import styles from './search.module.scss';
import ErrorButton from '../error/ErrorButton';

export default class Search extends React.Component {
  render() {
    return (
      <section className={styles.search}>
        <div className={styles.search_wrap}>
          <Input
            type="search"
            id="search"
            className={styles.input}
            placeholder="Search"
            onChange={() => {}}
          />
          <div>
            <SearchIcon className={styles.search_icon} />
          </div>
        </div>
        <ErrorButton onClick={() => {}} />
      </section>
    );
  }
}
