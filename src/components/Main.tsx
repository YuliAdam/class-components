import React from 'react';
import Search from './search/Search';
import Results from './results/Results';

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <Search />
        <Results />
      </main>
    );
  }
}
