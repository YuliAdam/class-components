import { render, screen } from '@testing-library/react';
import Header from '../../../src/components/header/Header';
import { describe, expect, test } from 'vitest';
import ReduxProvider from '../../testUtils/ReduxProvider';
import '@testing-library/jest-dom';

describe('header test', () => {
  test('loads and displays header', async () => {
    render(<ReduxProvider child={<Header />} />);
    expect(await screen.findByTitle('Pokémon icon')).toBeInTheDocument();
    expect(screen.getByTitle('sun')).toBeInTheDocument();
  });
});
