import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import PokemonNotFound from '../../src/pages/PokemonNotFound';
import { NOT_FOUND_MESSAGE } from '../../src/components/notFound/NotFound';
import ReduxProvider from '../testUtils/ReduxProvider';
import RouterProvider from '../testUtils/RouterProvider';

describe('main test', () => {
  test('loads and displays main', async () => {
    render(
      <ReduxProvider child={<RouterProvider child={<PokemonNotFound />} />} />
    );
    expect(screen.getByText(NOT_FOUND_MESSAGE)).toBeInTheDocument();
  });
});
