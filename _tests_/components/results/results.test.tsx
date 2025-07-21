import { render, screen, waitFor } from '@testing-library/react';
import Results, {
  ITEMS_AT_PAGE,
} from '../../../src/components/results/Results';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { localStorageSearchValueKey } from '../../../src/configs/localStorageConfig';
import { NOT_FOUND_URL, pokemonObject } from '../../responseData/data';
import { NOT_FOUND_MESSAGE } from '../../../src/components/notFound/NotFound';

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

describe('search test', () => {
  const pageNum = 1;
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads and displays results', async () => {
    render(<Results {...mockDate} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(screen.getByText('Prev')).toBeInTheDocument();
    });
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
    mockDate.searchValue = pokemonObject.name;
    localStorage.setItem(localStorageSearchValueKey, mockDate.searchValue);
    render(<Results {...mockDate} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    render(<Results {...mockDate} />);
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper.children.length).toBe(1);
  });

  test('loads and displays result by search type', async () => {
    mockDate.searchValue = pokemonObject.types[0];
    localStorage.setItem(localStorageSearchValueKey, mockDate.searchValue);
    render(<Results {...mockDate} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) {
        expect(loadElement).not.toBeInTheDocument();
      }
    });
    render(<Results {...mockDate} />).debug();
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper.children.length).toBe(1);
    expect(
      screen.getByText(`: ${pokemonObject.types.join(', ')}`)
    ).toBeInTheDocument();
  });

  test('loads and displays result by search ability', async () => {
    mockDate.searchValue = pokemonObject.abilities[0];
    localStorage.setItem(localStorageSearchValueKey, mockDate.searchValue);
    render(<Results {...mockDate} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    render(<Results {...mockDate} />);
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper.children.length).toBe(1);
    expect(
      screen.getByText(`: ${pokemonObject.abilities.join(', ')}`)
    ).toBeInTheDocument();
  });

  test('loads and displays not found page', async () => {
    mockDate.searchValue = NOT_FOUND_URL;
    localStorage.setItem(localStorageSearchValueKey, mockDate.searchValue);
    render(<Results {...mockDate} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    render(<Results {...mockDate} />);
    expect(screen.getByText(NOT_FOUND_MESSAGE)).toBeInTheDocument();
  });
});
