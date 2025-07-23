import styles from './error.module.scss';

interface Props {
  onClick: () => void;
  hasError: boolean;
}

export default function ErrorButton(props: Props) {
  return (
    <button
      className={`${styles.error_button} ${props.hasError ? 'opacity' : ''}`}
      onClick={props.onClick}
    >
      Error Button
    </button>
  );
}
