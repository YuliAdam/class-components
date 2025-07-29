import { cleanup, render, screen } from '@testing-library/react';
import ErrorBoundary from '../../../src/components/error/ErrorBoundary';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

const testMainFallback = <div>Main content</div>;
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

describe('error boundary test', () => {
  test('loads and displays main content', async () => {
    render(
      <MemoryRouter>
        <ErrorBoundary {...mockDate} />
      </MemoryRouter>
    );
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });
  test('loads and displays error content', async () => {
    render(
      <MemoryRouter>
        <ErrorBoundary {...errorMockDate} />
      </MemoryRouter>
    );
    expect(screen.getByText('Sorry.. there was an error')).toBeTruthy();
    userEvent.click(screen.getByText('Back'));
    cleanup();
    render(
      <MemoryRouter>
        <ErrorBoundary {...mockDate} />
      </MemoryRouter>
    );
    expect(screen.getByText('Main content')).toBeTruthy();
  });
});
