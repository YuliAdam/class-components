import { localStorageSearchValueKey } from '../configs/localStorageConfig';

export function setSearchValueInLocalStorage(value: string) {
  localStorage.setItem(localStorageSearchValueKey, value);
}

export function getSearchValueFromLocalStorage() {
  return localStorage.getItem(localStorageSearchValueKey) || '';
}
