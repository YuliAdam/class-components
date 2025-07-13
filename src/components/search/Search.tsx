import React, { type ChangeEvent, type KeyboardEvent } from 'react';
import Input from '../Input';
import SearchIcon from '../../assets/img/searchIcon';
import styles from './search.module.scss';
import ErrorButton from '../error/ErrorButton';
import { getSearchValueFromLocalStorage } from '../../localStorage/localStorage';

interface Props {
  submitInput: (text: string) => void;
  generateError: () => void;
  hasError: boolean;
}
interface State {
  value: string;
}
export default class Search extends React.Component<Props> {
  state: State = {
    value: getSearchValueFromLocalStorage(),
  };

  changeInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement) {
      const text = e.target.value;
      this.setState({ value: text });
      if (!text.trim()) {
        this.props.submitInput(text);
      }
    }
  }

  keyDownInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement && e.key === 'Enter') {
      const text = e.target.value.trim();
      this.props.submitInput(text);
      this.setState({ value: text });
    }
  }

  render() {
    return (
      <section className={styles.search}>
        <div className={styles.search_wrap}>
          <Input
            type="search"
            id="search"
            className={styles.input}
            placeholder="Search"
            value={this.state.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => this.changeInput(e)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              this.keyDownInput(e)
            }
          />
          <div>
            <SearchIcon
              className={styles.search_icon}
              onClick={() => this.props.submitInput(this.state.value)}
            />
          </div>
        </div>
        <ErrorButton
          onClick={this.props.generateError}
          hasError={this.props.hasError}
        />
      </section>
    );
  }
}
