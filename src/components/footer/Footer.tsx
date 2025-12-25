import { useSelector } from 'react-redux';
import GitHubLogo from '../../assets/img/github-logo';
import RSSchoolLogo from '../../assets/img/rsSchool-logo';
import styles from './footer.module.scss';
import type { RootState } from '../../store/store';
import { gitHubInfo } from '../../assets/authorInfo';

export default function Footer() {
  const isDarkTheme = useSelector((state: RootState) => state.themes.isDark);
  return (
    <footer className={styles.footer}>
      <a href={gitHubInfo.href}>
        <GitHubLogo
          className={`${styles.footer_gitHub} ${isDarkTheme ? styles.dark : ''}`}
        />
      </a>
      <a className={styles.footer_link} href={gitHubInfo.href}>
        {gitHubInfo.text}
      </a>
      <p className={styles.footer_text}>
        /{gitHubInfo.year}/{gitHubInfo.schoolName}
      </p>
      <a className={styles.footer_link} href={gitHubInfo.courseLink}>
        <RSSchoolLogo
          className={`${styles.footer_RSSchool} ${isDarkTheme ? styles.dark : ''}`}
        />
      </a>
    </footer>
  );
}
