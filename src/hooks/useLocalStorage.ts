import { useState } from 'react';
import {
  getSearchValueFromLocalStorage,
  setSearchValueInLocalStorage,
} from '../localStorage/localStorage';

type DispatchAction = string | ((prevState: string) => string);

export default function useLocalStorage(initialValue: string) {
  const [value, setValue] = useState(() => {
    const data = getSearchValueFromLocalStorage();
    return data || initialValue;
  });

  function handleDispatch(action: DispatchAction) {
    if (typeof action === 'function') {
      setValue((prevState) => {
        const newValue = (action as (prevState: string) => string)(prevState);
        setSearchValueInLocalStorage(newValue);
        return newValue;
      });
    } else {
      setValue(action);
      setSearchValueInLocalStorage(action);
    }
  }
  return [value, handleDispatch];
}
