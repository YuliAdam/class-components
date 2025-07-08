import React from 'react';
import styles from './header.module.scss';
import Pokemon from '../../assets/img/pokemon';

export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <Pokemon className={styles.header_title} />
      </header>
    );
  }
}
