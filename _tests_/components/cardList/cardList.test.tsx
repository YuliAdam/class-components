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
import { NOT_FOUND_URL, pokemonObject } from '../../responseData/data';

describe('cardList test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('loads and displays CardList', async () => {
    render(<ReduxProvider child={<RouterProvider child={<CardList />} />} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(loadElement).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.findAllByTestId('pokemon card wrap')).toBeTruthy();
    });
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
    render(
      <ReduxProvider child={<RouterProvider child={<CardList />} />} />
    ).debug();
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      expect(loadElement).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.findAllByTestId('pokemon card wrap')).toBeTruthy();
    });
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(1);
  });

  test('get CardList if search ability', async () => {
    render(<ReduxProvider child={<RouterProvider child={<Search />} />} />);
    const input = screen.getByPlaceholderText('Search');
    await userEvent.clear(input);
    await userEvent.type(input, pokemonObject.abilities[0]);
    const searchIcon = screen.getByTitle('Search Icon');
    await userEvent.click(searchIcon);
    cleanup();
    render(<ReduxProvider child={<RouterProvider child={<CardList />} />} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      expect(loadElement).not.toBeInTheDocument();
    });
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(1);
  });
  test('get CardList if search type', async () => {
    render(<ReduxProvider child={<RouterProvider child={<Search />} />} />);
    const input = screen.getByPlaceholderText('Search');
    await userEvent.clear(input);
    await userEvent.type(input, pokemonObject.types[0]);
    const searchIcon = screen.getByTitle('Search Icon');
    await userEvent.click(searchIcon);
    cleanup();
    render(<ReduxProvider child={<RouterProvider child={<CardList />} />} />);
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      expect(loadElement).not.toBeInTheDocument();
    });
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(1);
  });

  test('get CardList if not found', async () => {
    render(<ReduxProvider child={<RouterProvider child={<Search />} />} />);
    const input = screen.getByPlaceholderText('Search');
    await userEvent.clear(input);
    await userEvent.type(input, NOT_FOUND_URL);
    const searchIcon = screen.getByTitle('Search Icon');
    await userEvent.click(searchIcon);
    cleanup();
    render(<ReduxProvider child={<RouterProvider child={<CardList />} />} />);
    expect(screen.getByAltText('loading...')).toBeInTheDocument();
  });
});
