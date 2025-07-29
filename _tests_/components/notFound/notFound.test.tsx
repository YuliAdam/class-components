import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import NotFound, {
  NOT_FOUND_MESSAGE,
} from '../../../src/components/notFound/NotFound';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

describe('not found test', () => {
  test('loads and displays not found', async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(await screen.findAllByText('4')).toHaveLength(2);
    expect(await screen.findByAltText('pokeball')).toBeInTheDocument();
    expect(screen.getByText(NOT_FOUND_MESSAGE)).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
  });
});
