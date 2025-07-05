import React from 'react';
import GitHubLogo from '../assets/img/github-logo';
import RSSchoolLogo from '../assets/img/rsSchool-logo';

const gitHubInfo = {
  href: 'https://github.com/YuliAdam',
  text: '@YuliAdam/',
};

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <a href={gitHubInfo.href}>
          <GitHubLogo className="" />
        </a>
        <a href={gitHubInfo.href}>{gitHubInfo.text}</a>
        <p>{`/2025/RSchool`}</p>
        <a href="https://rs.school/courses/javascript-ru">
          <RSSchoolLogo className="" />
        </a>
      </footer>
    );
  }
}
