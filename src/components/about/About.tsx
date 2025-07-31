import { Link, useNavigate } from 'react-router';
import GitHubLogo from '../../assets/img/github-logo';
import styles from './about.module.scss';
import { gitHubInfo } from '../footer/Footer';
import { PATH } from '../../configs/routesConfig';
const INFO = {
  name: 'Yuliya Adamovich',
  role: 'Frontend Developer',
  image: '/yuliadam.webp',
  github: 'YuliAdam',
};
function About() {
  const navigate = useNavigate();
  return (
    <section className={styles.about}>
      <button
        className={styles.about_back}
        onClick={() => navigate(PATH.empty)}
      >
        Home
      </button>
      <div className={styles.about_wrap}>
        <div className={styles.about_info}>
          <h1>{INFO.name}</h1>
          <p>{INFO.role}</p>
          <Link to={gitHubInfo.href}>
            <div className={styles.about_gh}>
              <GitHubLogo className="" />
              <p>{INFO.github}</p>
            </div>
          </Link>
        </div>
        <div className={styles.about_text}>
          <p>
            Hi! My name is Yuliya Adamovich and I&apos;m a full-stack developer
            junior! I&apos;m from Belarus.
          </p>
          <span>
            <Link to={gitHubInfo.courseLink}> React 2025Q3 </Link>
          </span>
          <span>
            - is a third course by RSSchool what I frequenting. I hope to find
            work as a developer soon!
          </span>
          <p>Thank you for attention and enjoy my application about pokemon!</p>
        </div>
      </div>
      <img src={INFO.image} alt={INFO.name} />
    </section>
  );
}

export default About;
