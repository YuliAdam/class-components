import { localStorageKeys } from '../configs/localStorageConfig';

export function setSearchValueInLocalStorage(value: string) {
  localStorage.setItem(localStorageKeys.searchValue, value);
}

export function getSearchValueFromLocalStorage() {
  return localStorage.getItem(localStorageKeys.searchValue) || '';
}

export function getWishListFromLocalStorage(): string[] {
  const result = localStorage.getItem(localStorageKeys.wishList);
  return result ? JSON.parse(result) : [];
}

export function setWishListInLocalStorage(value: string[]) {
  localStorage.setItem(localStorageKeys.wishList, JSON.stringify(value));
}
