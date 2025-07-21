import { afterEach, describe, expect, test } from 'vitest';
import { localStorageSearchValueKey } from '../../src/configs/localStorageConfig';
import {
  setSearchValueInLocalStorage,
  getSearchValueFromLocalStorage,
} from '../../src/localStorage/localStorage';

const LS_KEY = localStorageSearchValueKey;

describe('local storage', () => {
  afterEach(() => {
    localStorage.clear();
  });
  describe('getSearchValueFromLocalStorage', () => {
    test('get search value from LocalStorage', () => {
      const testValue = 'test';
      localStorage.setItem(LS_KEY, testValue);
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
      expect(localStorage.getItem(LS_KEY)).toBe(testValue);
    });
    test('set search value from LocalStorage', () => {
      const testValue = '';
      setSearchValueInLocalStorage(testValue);
      expect(localStorage.getItem(LS_KEY)).toBe(testValue);
    });
  });
});
