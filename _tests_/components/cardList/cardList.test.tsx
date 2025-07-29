import { render, screen, waitFor } from '@testing-library/react';
import CardList, {
  ITEMS_AT_PAGE,
} from '../../../src/components/cards/CardList';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

describe('search test', () => {
  const pageNum = 1;
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads and displays CardList', async () => {
    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    const loadElement = screen.getByAltText('loading...');
    await waitFor(() => {
      if (loadElement) expect(screen.getByText('Prev')).toBeInTheDocument();
    });
    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    ).debug();
    const pokemonWrapper = screen.getByTestId('pokemon card wrap');
    expect(pokemonWrapper).toBeInTheDocument();
    expect(pokemonWrapper.children.length).toBe(ITEMS_AT_PAGE);
    expect(screen.getByText(pageNum)).toBeInTheDocument();
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeInTheDocument();
    const nextBtn = screen.getByText('Next');
    expect(nextBtn).toBeInTheDocument();
  });
});
