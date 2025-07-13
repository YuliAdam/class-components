import React from 'react';
import styles from './pagination.module.scss';

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
          className={`${styles.pagination_wrap} ${this.props.pageNum - 1 ? '' : 'opacity'}`}
          onClick={this.props.prevClick}
        >
          <p className={styles.pagination_text}>Prev</p>
        </div>
        <div className={styles.pagination_actual}>
          <p className={styles.pagination_text}>{this.props.pageNum}</p>
        </div>
        <div
          className={`${styles.pagination_wrap} ${this.props.hasNextPage ? '' : 'opacity'}`}
          onClick={this.props.nextClick}
        >
          <p className={styles.pagination_text}>Next</p>
        </div>
      </section>
    );
  }
}
