import React from 'react';
import Search from './search/Search';
import Results from './results/Results';

interface State {
  searchValue: string;
}

export default class Main extends React.Component {
  state: State = {
    searchValue: '',
  };

  submitInput(text: string) {
    this.setState({ searchValue: text.trim() });
    console.log(text);
  }

  render() {
    return (
      <main>
        <Search submitInput={(text: string) => this.submitInput(text)} />
        <Results
          searchValue={this.state.searchValue}
          deleteSearch={() => this.submitInput('')}
        />
      </main>
    );
  }
}
