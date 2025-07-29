import styles from './pagination.module.scss';

interface Props {
  pageNum: number;
  hasNextPage: boolean;
  prevClick: () => void;
  nextClick: () => void;
}

export default function Pagination(props: Props) {
  return (
    <section className={styles.pagination}>
      <div
        className={`${styles.pagination_wrap} ${props.pageNum - 1 ? '' : 'opacity'}`}
        onClick={props.prevClick}
      >
        <p className={styles.pagination_text}>Prev</p>
      </div>
      <div className={styles.pagination_actual}>
        <p className={styles.pagination_text}>{props.pageNum}</p>
      </div>
      <div
        className={`${styles.pagination_wrap} ${props.hasNextPage ? '' : 'opacity'}`}
        onClick={props.nextClick}
      >
        <p className={styles.pagination_text}>Next</p>
      </div>
    </section>
  );
}
