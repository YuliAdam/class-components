import { cleanup, render, screen, waitFor } from '@testing-library/react';
import CardList, {
  ITEMS_AT_PAGE,
} from '../../../src/components/cards/CardList';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import ReduxProvider from '../../testUtils/ReduxProvider';
import RouterProvider from '../../testUtils/RouterProvider';
import Search from '../../../src/components/search/Search';
import { userEvent } from '@testing-library/user-event';
import { pokemonObject } from '../../responseData/data';

describe('cardList test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads and displays CardList', async () => {
    render(<ReduxProvider child={<RouterProvider child={<CardList />} />} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(screen.getByText('Prev')).toBeInTheDocument();
    });
    render(<ReduxProvider child={<RouterProvider child={<CardList />} />} />);
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(ITEMS_AT_PAGE);
  });

  test('get CardList if search name', async () => {
    render(<ReduxProvider child={<RouterProvider child={<Search />} />} />);
    const input = screen.getByPlaceholderText('Search');
    await userEvent.type(input, pokemonObject.name);
    const searchIcon = screen.getByTitle('Search Icon');
    await userEvent.click(searchIcon);
    cleanup();
    render(<ReduxProvider child={<RouterProvider child={<CardList />} />} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      expect(loadElement).not.toBeInTheDocument();
    });
    render(
      <ReduxProvider child={<RouterProvider child={<CardList />} />} />
    ).debug();
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(1);
  });
});
