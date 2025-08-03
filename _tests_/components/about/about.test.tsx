import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import About from '../../../src/components/about/About';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import RouterProvider from '../../testUtils/RouterProvider';
import ReduxProvider from '../../testUtils/ReduxProvider';

describe('not found test', () => {
  test('loads and displays not found', async () => {
    render(<ReduxProvider child={<RouterProvider child={<About />} />} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(screen.getByText('Yuliya Adamovich')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('YuliAdam')).toBeInTheDocument();
    expect(await screen.findAllByRole('link')).toHaveLength(2);
    expect(screen.getByAltText('Yuliya Adamovich')).toBeInTheDocument();
  });
});
