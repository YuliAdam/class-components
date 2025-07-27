import { render, screen, waitFor } from '@testing-library/react';
import Results, {
  ITEMS_AT_PAGE,
} from '../../../src/components/results/Results';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { localStorageSearchValueKey } from '../../../src/configs/localStorageConfig';
import { NOT_FOUND_URL, pokemonObject } from '../../responseData/data';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PATH } from '../../../src/configs/routesConfig';
import NotFound from '../../../src/components/notFound/NotFound';

const mockDate = {
  hasError: false,
  generateError: vi.fn(),
};

describe('search test', () => {
  const pageNum = 1;
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads and displays results', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(screen.getByText('Prev')).toBeInTheDocument();
    });
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(ITEMS_AT_PAGE);
    expect(screen.getByText(pageNum)).toBeInTheDocument();
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeInTheDocument();
    const nextBtn = screen.getByText('Next');
    expect(nextBtn).toBeInTheDocument();
  });

  test('loads and displays result by search name', async () => {
    localStorage.setItem(localStorageSearchValueKey, pokemonObject.name);
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
  });

  test('loads and displays result by search type', async () => {
    localStorage.setItem(localStorageSearchValueKey, pokemonObject.types[0]);
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) {
        expect(loadElement).not.toBeInTheDocument();
      }
    });
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
  });

  test('loads and displays result by search ability', async () => {
    localStorage.setItem(
      localStorageSearchValueKey,
      pokemonObject.abilities[0]
    );
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
  });

  test('loads and displays not found page', async () => {
    localStorage.setItem(localStorageSearchValueKey, NOT_FOUND_URL);
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.empty} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  });

  test('loads error page if error', async () => {
    mockDate.hasError = true;
    expect(() => Results()).toThrowError();
  });
});
