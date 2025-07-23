import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Search from '../../../src/components/search/Search';
import { describe, expect, test, vi } from 'vitest';
import { localStorageSearchValueKey } from '../../../src/configs/localStorageConfig';
import '@testing-library/jest-dom';

const TEST_VALUE = 'test';
const NEW_VALUE = 'new value';
const mockDate = {
  submitInput: vi.fn(),
  generateError: vi.fn(),
  hasError: false,
};

describe('search test', () => {
  test('loads and displays search', async () => {
    localStorage.setItem(localStorageSearchValueKey, TEST_VALUE);
    render(<Search {...mockDate} />).debug();
    const btn = screen.getByText('Error Button');
    expect(btn).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
    const searchIcon = screen.getByTitle('Search Icon');
    expect(searchIcon).toBeInTheDocument();
    //expect(input).toHaveValue(TEST_VALUE);
    await userEvent.type(input, NEW_VALUE);
    //expect(input).toHaveValue(TEST_VALUE.concat(NEW_VALUE));
    await userEvent.keyboard('{Enter>}');
    expect(mockDate.submitInput).toHaveBeenCalledTimes(1);
    await userEvent.clear(input);
    expect(input).toHaveValue('');
    expect(mockDate.submitInput).toHaveBeenCalledTimes(2);
    await userEvent.type(input, NEW_VALUE);
    await userEvent.click(searchIcon);
    expect(mockDate.submitInput).toHaveBeenCalledTimes(3);
    await userEvent.click(btn);
    expect(mockDate.generateError).toHaveBeenCalledTimes(1);
  });
});
