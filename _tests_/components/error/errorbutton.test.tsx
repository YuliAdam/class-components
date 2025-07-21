import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ErrorButton from '../../../src/components/error/ErrorButton';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';

const mockDate = {
  onClick: vi.fn(() => {
    mockDate.hasError = true;
  }),
  hasError: false,
};

describe('error button test', () => {
  test('loads and displays error button', async () => {
    render(<ErrorButton {...mockDate} />);
    const btn = screen.getByText('Error Button');
    expect(btn).toBeInTheDocument();
    expect(btn.classList.contains('opacity')).toBeFalsy();
    await userEvent.click(btn);
    expect(mockDate.onClick).toHaveBeenCalledTimes(1);
  });
  test('loads and displays error button with opacity style if error', async () => {
    mockDate.hasError = true;
    render(<ErrorButton {...mockDate} />);
    const btn = screen.getByText('Error Button');
    expect(btn.classList.contains('opacity')).toBeTruthy();
    await userEvent.click(btn);
    expect(mockDate.onClick).toHaveBeenCalledTimes(2);
  });
});
