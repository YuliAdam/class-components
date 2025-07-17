import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import NotFound, {
  NOT_FOUND_MESSAGE,
} from '../../../src/components/notFound/NotFound';
import { expect, test, vi } from 'vitest';

test('loads and displays header', async () => {
  const handleClick = vi.fn();
  render(<NotFound backClick={handleClick} />);
  expect(await screen.findAllByText('4')).toHaveLength(2);
  expect(await screen.findAllByAltText('pokeball')).toBeTruthy();
  expect(screen.getByText(NOT_FOUND_MESSAGE)).toBeTruthy();
  const button = screen.getByRole('button');
  expect(button).toBeTruthy();
  await userEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
