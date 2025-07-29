import { render, screen } from '@testing-library/react';
import Item from '../../../src/components/item/Item';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

describe('item test', () => {
  test('loads and displays item', async () => {
    render(
      <MemoryRouter>
        <Item />
      </MemoryRouter>
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
