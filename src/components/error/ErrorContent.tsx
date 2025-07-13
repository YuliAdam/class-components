import React from 'react';
import styles from '../notFound/notFound.module.scss';
import Pokeball from '../../assets/img/pokeball.svg';

interface Props {
  backClick: () => void;
}

export default class ErrorContent extends React.Component<Props> {
  render() {
    return (
      <section className={styles.not_found}>
        <div className={styles.not_found_wrap}>
          <span className={styles.not_found_text}>E</span>
          <span className={styles.not_found_text}>R</span>
          <span className={styles.not_found_text}>R</span>
          <img className={styles.not_found_img} src={Pokeball} alt="pokeball" />
          <span className={styles.not_found_text}>R</span>
        </div>
        <p className={styles.not_found_info}>Sorry.. there was an error</p>
        <button className={styles.not_found_btn} onClick={this.props.backClick}>
          Back
        </button>
      </section>
    );
  }
}
