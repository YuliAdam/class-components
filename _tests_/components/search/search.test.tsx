import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Search from '../../../src/components/search/Search';
import { describe, expect, test } from 'vitest';
import { localStorageSearchValueKey } from '../../../src/configs/localStorageConfig';
import '@testing-library/jest-dom';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PATH } from '../../../src/configs/routesConfig';

const TEST_VALUE = 'test';
const NEW_VALUE = 'new value';

describe('search test', () => {
  test('loads and displays search with value from LS', async () => {
    localStorage.setItem(localStorageSearchValueKey, TEST_VALUE);
    console.log(localStorage.getItem(localStorageSearchValueKey));
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Search />} />
        </Routes>
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
    const icon = screen.getByTitle('Search Icon');
    expect(icon).toBeInTheDocument();
    await userEvent.click(icon);
  });

  test('loads and displays search if change value', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Search />} />
        </Routes>
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Search');
    await userEvent.type(input, NEW_VALUE);
    expect(input).toHaveValue(NEW_VALUE);
  });
});
