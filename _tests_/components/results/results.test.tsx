import { render, screen, waitFor } from '@testing-library/react';
import Results, {
  ITEMS_AT_PAGE,
} from '../../../src/components/results/Results';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { localStorageSearchValueKey } from '../../../src/configs/localStorageConfig';

describe('search test', () => {
  const mockDate = {
    searchValue: '',
    deleteSearch: vi.fn(),
    hasError: false,
    generateError: vi.fn(),
  };

  const errorMockDate = {
    searchValue: '',
    deleteSearch: vi.fn(),
    hasError: true,
    generateError: vi.fn(),
  };

  const pageNum = 1;

  test('loads and displays results', async () => {
    render(<Results {...mockDate} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(
      () => {
        if (loadElement) expect(loadElement).not.toBeInTheDocument();
      },
      { interval: 10000 }
    );
    render(<Results {...mockDate} />);
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(ITEMS_AT_PAGE);
    expect(screen.getByText(pageNum)).toBeInTheDocument();
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeInTheDocument();
    const nextBtn = screen.getByText('Next');
    expect(nextBtn).toBeInTheDocument();
  });

  test('loads error page if error', async () => {
    expect(() => new Results(errorMockDate).render()).toThrowError();
  });

  test('loads and displays result by search name', async () => {
    mockDate.searchValue = 'Bulbasaur';
    localStorage.setItem(localStorageSearchValueKey, mockDate.searchValue);
    render(<Results {...mockDate} />);
    const loadElement = screen.getByAltText('loading...');
    expect(loadElement).toBeTruthy();
    await waitFor(() => {
      expect(loadElement).not.toBeInTheDocument();
    });
    render(<Results {...mockDate} />);
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper.children.length).toBe(1);
  });

  test('loads and displays result by search type', async () => {
    mockDate.searchValue = 'normal';
    localStorage.setItem(localStorageSearchValueKey, mockDate.searchValue);
    render(<Results {...mockDate} />);
  });
  test('loads and displays result by search ability', async () => {
    mockDate.searchValue = 'overgrow';
    localStorage.setItem(localStorageSearchValueKey, mockDate.searchValue);
    render(<Results {...mockDate} />);
  });
});
