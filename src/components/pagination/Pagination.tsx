import { useSelector } from 'react-redux';
import styles from './pagination.module.scss';
import type { RootState } from '../../store/store';

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
  const isDarkTheme = useSelector((state: RootState) => state.themes.isDark);
  return (
    <section className={styles.pagination}>
      <div
        className={`${styles.pagination_wrap} ${pageNum - 1 ? '' : 'opacity'} ${isDarkTheme ? styles.dark : ''}`}
        onClick={prevClick}
      >
        <p className={styles.pagination_text}>Prev</p>
      </div>
      <div
        className={`${styles.pagination_actual} ${isDarkTheme ? styles.dark : ''}`}
      >
        <p className={styles.pagination_text}>{pageNum}</p>
      </div>
      <div
        className={`${styles.pagination_wrap} ${hasNextPage ? '' : 'opacity'} ${isDarkTheme ? styles.dark : ''}`}
        onClick={nextClick}
      >
        <p className={styles.pagination_text}>Next</p>
      </div>
    </section>
  );
}
