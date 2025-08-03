import { cleanup, render, screen } from '@testing-library/react';
import Header from '../../../src/components/header/Header';
import { describe, expect, test } from 'vitest';
import ReduxProvider from '../../testUtils/ReduxProvider';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';

describe('header test', () => {
  test('loads and displays header', async () => {
    render(<ReduxProvider child={<Header />} />);
    expect(await screen.findByTitle('Pokémon icon')).toBeInTheDocument();
    const sun = screen.getByTitle('sun');
    expect(sun).toBeInTheDocument();
    await userEvent.click(sun.parentElement ?? sun);
    cleanup();
    render(<ReduxProvider child={<Header />} />).debug();
    expect(screen.getByTitle('Moon')).toBeInTheDocument();
  });
});
