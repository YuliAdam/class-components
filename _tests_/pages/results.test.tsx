import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import Results from '../../src/pages/Results';
import { localStorageKeys } from '../../src/configs/localStorageConfig';
import { pokemonObject } from '../responseData/data';
import userEvent from '@testing-library/user-event';
import ReduxProvider from '../testUtils/ReduxProvider';
import RouterProvider from '../testUtils/RouterProvider';

describe('results test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('loads and displays result by search name', async () => {
    render(<ReduxProvider child={<RouterProvider child={<Results />} />} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    cleanup();
    render(<ReduxProvider child={<RouterProvider child={<Results />} />} />);
    const input = screen.getByPlaceholderText('Search');
    const icon = screen.getByTitle('Search Icon');
    await userEvent.type(input, pokemonObject.name);
    await userEvent.click(icon);
  });
  test('loads and displays result by search type', async () => {
    localStorage.setItem(localStorageKeys.searchValue, pokemonObject.types[0]);
    render(<ReduxProvider child={<RouterProvider child={<Results />} />} />);
  });

  test('loads and displays result by search ability', async () => {
    localStorage.setItem(
      localStorageKeys.searchValue,
      pokemonObject.abilities[0]
    );
    render(<ReduxProvider child={<RouterProvider child={<Results />} />} />);
  });
});
