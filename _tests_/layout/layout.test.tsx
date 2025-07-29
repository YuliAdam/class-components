import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { Layout } from '../../src/layout/layout';
import { MemoryRouter } from 'react-router';

describe('layout test', () => {
  test('loads and displays layout', async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    ).debug();
    expect(screen.getByText('@YuliAdam')).toBeInTheDocument();
    expect(screen.getByText('/2025/RSchool')).toBeInTheDocument();
    expect(screen.getByTitle('Pokémon icon')).toBeInTheDocument();
  });
});
