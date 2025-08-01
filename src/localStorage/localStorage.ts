import { localStorageKeys } from '../configs/localStorageConfig';
import type { IPokemon } from '../types/types';

export function setSearchValueInLocalStorage(value: string) {
  localStorage.setItem(localStorageKeys.searchValue, value);
}

export function getSearchValueFromLocalStorage() {
  return localStorage.getItem(localStorageKeys.searchValue) || '';
}

export function getWishListFromLocalStorage(): IPokemon[] {
  const result = localStorage.getItem(localStorageKeys.wishList);
  return result ? JSON.parse(result) : [];
}

export function setWishListInLocalStorage(value: IPokemon[]) {
  localStorage.setItem(localStorageKeys.wishList, JSON.stringify(value));
}
