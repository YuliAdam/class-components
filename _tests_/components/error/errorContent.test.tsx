import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ErrorContent from '../../../src/components/error/ErrorContent';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import RouterProvider from '../../testUtils/RouterProvider';

const mockDate = {
  backClick: vi.fn(),
};

describe('error content test', () => {
  test('loads and displays error button', async () => {
    render(<RouterProvider child={<ErrorContent {...mockDate} />} />);
    const btn = screen.getByText('Back');
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(mockDate.backClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Sorry.. there was an error')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getAllByText('R')).toHaveLength(3);
    expect(screen.getByAltText('pokeball')).toBeInTheDocument();
  });
});
