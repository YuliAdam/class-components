import React from 'react';
import Pokeball from '../../assets/img/pokeball.svg';
import styles from './notFound.module.scss';

interface Props {
  backClick: () => void;
}

const NOT_FOUND_MESSAGE = 'Pokemon not found';

export default class NotFound extends React.Component<Props> {
  render() {
    return (
      <section className={styles.not_found}>
        <div className={styles.not_found_wrap}>
          <span className={styles.not_found_text}>4</span>
          <img className={styles.not_found_img} src={Pokeball} alt="pokeball" />
          <span className={styles.not_found_text}>4</span>
        </div>
        <p className={styles.not_found_info}>{NOT_FOUND_MESSAGE}</p>
        <button className={styles.not_found_btn} onClick={this.props.backClick}>
          Back
        </button>
      </section>
    );
  }
}
