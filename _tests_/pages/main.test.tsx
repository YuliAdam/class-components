import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Main from '../../src/pages/Main';
import RouterProvider from '../testUtils/RouterProvider';

describe('main test', () => {
  test('loads and displays main', async () => {
    render(<RouterProvider child={<Main />} />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
