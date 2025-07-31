import styles from './pagination.module.scss';

interface Props {
  pageNum: number;
  hasNextPage: boolean;
  prevClick: () => void;
  nextClick: () => void;
}

export default function Pagination({
  pageNum,
  hasNextPage,
  prevClick,
  nextClick,
}: Props) {
  return (
    <section className={styles.pagination}>
      <div
        className={`${styles.pagination_wrap} ${pageNum - 1 ? '' : 'opacity'}`}
        onClick={prevClick}
      >
        <p className={styles.pagination_text}>Prev</p>
      </div>
      <div className={styles.pagination_actual}>
        <p className={styles.pagination_text}>{pageNum}</p>
      </div>
      <div
        className={`${styles.pagination_wrap} ${hasNextPage ? '' : 'opacity'}`}
        onClick={nextClick}
      >
        <p className={styles.pagination_text}>Next</p>
      </div>
    </section>
  );
}
