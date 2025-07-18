import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ErrorContent from '../../../src/components/error/ErrorContent';
import { describe, expect, test, vi } from 'vitest';

describe('error content test', () => {
  const mockDate = {
    backClick: vi.fn(),
  };

  test('loads and displays error button', async () => {
    render(<ErrorContent {...mockDate} />);
    const btn = screen.getByText('Back');
    expect(btn).toBeTruthy();
    await userEvent.click(btn);
    expect(mockDate.backClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Sorry.. there was an error')).toBeTruthy();
    expect(screen.getByText('E')).toBeTruthy();
    expect(screen.getAllByText('R')).toHaveLength(3);
    expect(screen.getAllByAltText('pokeball')).toBeTruthy();
  });
});
