import { afterEach, describe, expect, test } from 'vitest';
import { localStorageKeys } from '../../src/configs/localStorageConfig';
import {
  setSearchValueInLocalStorage,
  getSearchValueFromLocalStorage,
} from '../../src/localStorage/localStorage';

describe('local storage', () => {
  afterEach(() => {
    localStorage.clear();
  });
  describe('getSearchValueFromLocalStorage', () => {
    test('get search value from LocalStorage', () => {
      const testValue = 'test';
      localStorage.setItem(localStorageKeys.searchValue, testValue);
      expect(getSearchValueFromLocalStorage()).toBe(testValue);
    });
    test('gets search value from LocalStorage', () => {
      expect(getSearchValueFromLocalStorage()).toBe('');
    });
  });
  describe('setSearchValueInLocalStorage', () => {
    test('set search value from LocalStorage', () => {
      const testValue = 'test';
      setSearchValueInLocalStorage(testValue);
      expect(localStorage.getItem(localStorageKeys.searchValue)).toBe(
        testValue
      );
    });
    test('set search value from LocalStorage', () => {
      const testValue = '';
      setSearchValueInLocalStorage(testValue);
      expect(localStorage.getItem(localStorageKeys.searchValue)).toBe(
        testValue
      );
    });
  });
});
