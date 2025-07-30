import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import SelectPokemon from '../../src/pages/SelectPokemon';
import '@testing-library/jest-dom';
import ReduxProvider from '../testUtils/ReduxProvider';
import RouterProvider from '../testUtils/RouterProvider';

describe('selectPokemon test', () => {
  test('loads and displays selectPokemon', async () => {
    render(
      <ReduxProvider child={<RouterProvider child={<SelectPokemon />} />} />
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
