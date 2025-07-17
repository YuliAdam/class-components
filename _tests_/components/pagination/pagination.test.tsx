import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Pagination from '../../../src/components/pagination/Pagination';
import { describe, expect, test, vi } from 'vitest';

describe('pagination test', () => {
  const mockDate = {
    pageNum: 1,
    hasNextPage: true,
    prevClick: vi.fn(() => {
      if (mockDate.pageNum - 1) mockDate.pageNum--;
    }),
    nextClick: vi.fn(() => {
      if (mockDate.hasNextPage) mockDate.pageNum++;
    }),
  };

  test('loads and displays pagination', async () => {
    render(<Pagination {...mockDate} />);
    expect(screen.getByText('1')).toBeTruthy();
    const nextBtn = screen.getByText('Next');
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });

  test('should change page number', async () => {
    render(<Pagination {...mockDate} />);
    const nextBtn = screen.getByText('Next');
    await userEvent.click(nextBtn);
    cleanup();
    expect(mockDate.nextClick).toHaveBeenCalledTimes(1);
    render(<Pagination {...mockDate} />);
    expect(screen.getByText('2')).toBeTruthy();
    expect(nextBtn.parentElement?.classList.contains('opacity')).toBeFalsy();
  });

  test('should change page number', async () => {
    render(<Pagination {...mockDate} />);
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn.parentElement?.classList.contains('opacity')).toBeFalsy();
    await userEvent.click(prevBtn);
    cleanup();
    expect(mockDate.prevClick).toHaveBeenCalledTimes(1);
    render(<Pagination {...mockDate} />);
    expect(screen.getByText('1')).toBeTruthy();
  });

  test('should not change page number if page is 1', async () => {
    render(<Pagination {...mockDate} />);
    const prevBtn = screen.getByText('Prev');
    await userEvent.click(prevBtn);
    cleanup();
    expect(mockDate.prevClick).toHaveBeenCalledTimes(2);
    render(<Pagination {...mockDate} />);
    expect(screen.getByText('1')).toBeTruthy();
    expect(prevBtn.parentElement?.classList.contains('opacity')).toBeTruthy();
  });

  test('should not change page number if is last page', async () => {
    mockDate.hasNextPage = false;
    render(<Pagination {...mockDate} />);
    const actualPage = screen.getByText(mockDate.pageNum);
    const nextBtn = screen.getByText('Next');
    await userEvent.click(nextBtn);
    cleanup();
    expect(mockDate.nextClick).toHaveBeenCalledTimes(2);
    render(<Pagination {...mockDate} />);
    expect(actualPage).toBeTruthy();
    expect(nextBtn.parentElement?.classList.contains('opacity')).toBeTruthy();
  });
});
