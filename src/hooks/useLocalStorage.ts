import { useState, type Dispatch, type SetStateAction } from 'react';
import {
  getSearchValueFromLocalStorage,
  setSearchValueInLocalStorage,
} from '../localStorage/localStorage';

type DispatchAction = string | ((prevState: string) => string);

export default function useLocalStorage(
  initialValue: string = ''
): [string | null, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState(
    getSearchValueFromLocalStorage() || initialValue
  );

  function handleDispatch(action: DispatchAction) {
    if (typeof action === 'function') {
      setValue((prevState) => {
        const newValue = action(prevState);
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
