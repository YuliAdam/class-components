import React from 'react';
import styles from './pagination.module.scss';
import ErrorButton from '../error/ErrorButton';

interface Props {
  pageNum: number;
  hasNextPage: boolean;
  prevClick: () => void;
  nextClick: () => void;
}

export default class Pagination extends React.Component<Props> {
  render() {
    return (
      <section className={styles.pagination}>
        <div
          className={`${styles.pagination_wrap} ${this.props.pageNum - 1 || styles.opacity}`}
          onClick={this.props.pageNum - 1 ? this.props.prevClick : () => {}}
        >
          <p className={styles.pagination_text}>Prev</p>
        </div>
        <div className={styles.pagination_actual}>
          <p className={styles.pagination_text}>{this.props.pageNum}</p>
        </div>
        <div
          className={`${styles.pagination_wrap} ${this.props.hasNextPage || styles.opacity}`}
          onClick={this.props.hasNextPage ? this.props.nextClick : () => {}}
        >
          <p className={styles.pagination_text}>Next</p>
        </div>
        <ErrorButton onClick={() => {}} />
      </section>
    );
  }
}
