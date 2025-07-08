import React from 'react';
import styles from './error.module.scss';

interface Props {
  onClick: () => void;
}

export default class ErrorButton extends React.Component<Props> {
  render() {
    return (
      <button className={styles.error_button} onClick={this.props.onClick}>
        Error Button
      </button>
    );
  }
}
