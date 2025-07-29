import Item from '../components/item/Item';
import styles from './pages.module.scss';
export default function SelectPokemon() {
  return (
    <>
      <div className={styles.container_item}>
        <Item />
      </div>
    </>
  );
}
