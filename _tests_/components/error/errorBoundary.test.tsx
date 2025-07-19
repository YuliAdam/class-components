import { cleanup, render, screen } from '@testing-library/react';
import ErrorBoundary from '../../../src/components/error/ErrorBoundary';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const testMainFallback = <div>Main content</div>;

describe('error content test', () => {
  const mockDate = {
    backClick: vi.fn(),
    fallback: testMainFallback,
  };
  function getError() {
    return new Error('error');
  }
  const errorMockDate = {
    backClick: vi.fn(),
    fallback: (
      <>
        {getError()}
        {testMainFallback}
      </>
    ),
  };

  test('loads and displays error button', async () => {
    render(<ErrorBoundary {...mockDate} />);
    expect(screen.getByText('Main content')).toBeTruthy();
    cleanup();
    render(<ErrorBoundary {...errorMockDate} />).debug();
    expect(screen.getByText('Sorry.. there was an error')).toBeTruthy();
    userEvent.click(screen.getByText('Back'));
    cleanup();
    render(<ErrorBoundary {...mockDate} />);
    expect(screen.getByText('Main content')).toBeTruthy();
  });
});
