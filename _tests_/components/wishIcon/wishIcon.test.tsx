import { cleanup, render, screen } from '@testing-library/react';
import { WishIcon } from '../../../src/components/wishList/WishIcon';
import PokemonCard from '../../../src/components/cards/PokemonCard';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import ReduxProvider from '../../testUtils/ReduxProvider';
import { testPokemon } from '../../responseData/data';
import { userEvent } from '@testing-library/user-event';

const mockDate = {
  pokemon: testPokemon,
  onClick: vi.fn(),
  className: '',
};

describe('wish icon test', () => {
  beforeAll(async () => {
    render(<ReduxProvider child={<PokemonCard {...mockDate} />} />);
    const heart = screen.getByTitle('Heart');
    await userEvent.click(heart.parentElement || heart);
    cleanup();
  });
  test('loads and displays wish icon if add like at pokemon card', async () => {
    render(<ReduxProvider child={<WishIcon />} />);
    expect(screen.getByTitle('Heart Off')).toBeInTheDocument();
    expect(screen.getByTitle('Download')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('call save file from wishIcon', async () => {
    render(<ReduxProvider child={<WishIcon />} />);
    window.URL.createObjectURL = vi.fn();
    const download = screen.getByTitle('Download');
    await userEvent.click(download.parentElement || download);
    expect(window.URL.createObjectURL).toBeCalledTimes(1);
  });

  test('remove wish icon if unselect all', async () => {
    render(<ReduxProvider child={<WishIcon />} />);
    const unselect = screen.getByTitle('Heart Off');
    const heart = screen.getByTitle('Heart');
    await userEvent.click(unselect.parentElement || unselect);
    cleanup();
    render(<ReduxProvider child={<WishIcon />} />);
    expect(heart).not.toBeInTheDocument();
  });
});
