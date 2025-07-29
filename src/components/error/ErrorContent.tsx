import styles from '../notFound/notFound.module.scss';
import Pokeball from '../../assets/img/pokeball.svg';
import { useNavigate } from 'react-router';
import { PATH } from '../../configs/routesConfig';

interface Props {
  backClick?: () => void;
  text?: string;
}
const ERROR_TEXT = 'Sorry.. there was an error';

export default function ErrorContent(props: Props) {
  const navigate = useNavigate();
  return (
    <section className={styles.not_found}>
      <div className={styles.not_found_wrap}>
        <span className={styles.not_found_text}>E</span>
        <span className={styles.not_found_text}>R</span>
        <span className={styles.not_found_text}>R</span>
        <img className={styles.not_found_img} src={Pokeball} alt="pokeball" />
        <span className={styles.not_found_text}>R</span>
      </div>
      <p className={styles.not_found_info}>{props.text || ERROR_TEXT}</p>
      <button
        className={styles.not_found_btn}
        onClick={() => {
          if (props.backClick) props.backClick();
          else navigate(PATH.empty.replace(':num', '1'));
        }}
      >
        Back
      </button>
    </section>
  );
}
