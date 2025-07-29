import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Main from '../../src/pages/Main';
import { MemoryRouter } from 'react-router';

describe('main test', () => {
  test('loads and displays main', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    ).debug();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
