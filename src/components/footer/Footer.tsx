import React from 'react';
import GitHubLogo from '../../assets/img/github-logo';
import RSSchoolLogo from '../../assets/img/rsSchool-logo';
import styles from './footer.module.scss';

const gitHubInfo = {
  href: 'https://github.com/YuliAdam',
  text: '@YuliAdam/',
};

const COURSE_LINK = 'https://rs.school/courses/reactjs';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <a href={gitHubInfo.href}>
          <GitHubLogo className={styles.footer_gitHub} />
        </a>
        <a className={styles.footer_link} href={gitHubInfo.href}>
          {gitHubInfo.text}
        </a>
        <p className={styles.footer_text}>/2025/RSchool</p>
        <a className={styles.footer_link} href={COURSE_LINK}>
          <RSSchoolLogo className={styles.footer_RSSchool} />
        </a>
      </footer>
    );
  }
}
