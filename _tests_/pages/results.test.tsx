import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import Results from '../../src/pages/Results';
import { localStorageSearchValueKey } from '../../src/configs/localStorageConfig';
import { pokemonObject } from '../responseData/data';
import userEvent from '@testing-library/user-event';

describe('results test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('loads and displays result by search name', async () => {
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    cleanup();
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search');
    const icon = screen.getByTitle('Search Icon');
    await userEvent.type(input, pokemonObject.name);
    await userEvent.click(icon);
  });
  test('loads and displays result by search type', async () => {
    localStorage.setItem(localStorageSearchValueKey, pokemonObject.types[0]);
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) {
        expect(loadElement).not.toBeInTheDocument();
      }
    });
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );
  });

  test('loads and displays result by search ability', async () => {
    localStorage.setItem(
      localStorageSearchValueKey,
      pokemonObject.abilities[0]
    );
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );
  });
});
