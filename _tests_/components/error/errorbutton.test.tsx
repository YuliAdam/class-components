import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ErrorButton from '../../../src/components/error/ErrorButton';
import { describe, expect, test, vi } from 'vitest';

describe('error button test', () => {
  const mockDate = {
    onClick: vi.fn(() => {
      mockDate.hasError = true;
    }),
    hasError: false,
  };

  test('loads and displays error button', async () => {
    render(<ErrorButton {...mockDate} />);
    const btn = screen.getByText('Error Button');
    expect(btn).toBeTruthy();
    expect(btn.classList.contains('opacity')).toBeFalsy();
    await userEvent.click(btn);
    cleanup();
    expect(mockDate.onClick).toHaveBeenCalledTimes(1);
    render(<ErrorButton {...mockDate} />);
    expect(
      screen.getByText('Error Button').classList.contains('opacity')
    ).toBeTruthy();
  });
});
