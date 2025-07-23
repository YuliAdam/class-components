import { useState } from 'react';
import Search from './search/Search';
import Results from './results/Results';
import {
  getSearchValueFromLocalStorage,
  setSearchValueInLocalStorage,
} from '../localStorage/localStorage';
import ErrorBoundary from './error/ErrorBoundary';

const initState = {
  searchValue: getSearchValueFromLocalStorage(),
  hasError: false,
};

export default function Main() {
  const [state, setState] = useState(initState);

  function submitInput(text: string) {
    setState({ searchValue: text.trim(), hasError: state.hasError });
    setSearchValueInLocalStorage(text.trim());
  }

  function generateError() {
    setState({
      searchValue: state.searchValue,
      hasError: true,
    });
  }

  function removeError() {
    setState({
      searchValue: state.searchValue,
      hasError: false,
    });
  }

  return (
    <>
      <Search
        submitInput={(text: string) => submitInput(text)}
        generateError={() => generateError()}
        hasError={state.hasError}
      />
      <ErrorBoundary
        fallback={
          <Results
            searchValue={state.searchValue}
            deleteSearch={() => submitInput('')}
            hasError={state.hasError}
            generateError={() => generateError()}
          />
        }
        backClick={() => removeError()}
      />
    </>
  );
}
