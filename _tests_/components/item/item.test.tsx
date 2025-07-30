import { render, screen } from '@testing-library/react';
import Item from '../../../src/components/item/Item';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import ReduxProvider from '../../testUtils/ReduxProvider';
import RouterProvider from '../../testUtils/RouterProvider';

describe('item test', () => {
  test('loads and displays item', async () => {
    render(<ReduxProvider child={<RouterProvider child={<Item />} />} />);
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
