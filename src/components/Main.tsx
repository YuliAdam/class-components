import React from 'react';
import Search from './search/Search';
import Results from './results/Results';
import {
  getSearchValueFromLocalStorage,
  setSearchValueInLocalStorage,
} from '../localStorage/localStorage';
import ErrorBoundary from './error/ErrorBoundary';

interface State {
  searchValue: string;
  hasError: boolean;
}

export default class Main extends React.Component {
  state: State = {
    searchValue: getSearchValueFromLocalStorage(),
    hasError: false,
  };

  submitInput(text: string) {
    this.setState({ searchValue: text.trim() });
    setSearchValueInLocalStorage(text.trim());
  }

  generateError() {
    this.setState({
      searchValue: this.state.searchValue,
      hasError: true,
    });
  }

  removeError() {
    this.setState({
      searchValue: this.state.searchValue,
      hasError: false,
    });
  }

  render() {
    return (
      <main>
        <Search
          submitInput={(text: string) => this.submitInput(text)}
          generateError={() => this.generateError()}
          hasError={this.state.hasError}
        />
        <ErrorBoundary
          fallback={
            <Results
              searchValue={this.state.searchValue}
              deleteSearch={() => this.submitInput('')}
              hasError={this.state.hasError}
              generateError={() => this.generateError()}
            />
          }
          backClick={() => this.removeError()}
        />
      </main>
    );
  }
}
