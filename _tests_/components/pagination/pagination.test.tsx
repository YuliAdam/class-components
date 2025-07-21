import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Pagination from '../../../src/components/pagination/Pagination';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';

const mockDate = {
  pageNum: 1,
  hasNextPage: true,
  prevClick: vi.fn(),
  nextClick: vi.fn(),
};

describe('pagination test', () => {
  test('loads and displays pagination', async () => {
    render(<Pagination {...mockDate} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    const nextBtn = screen.getByText('Next');
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn.parentElement?.classList.contains('opacity')).toBeTruthy();
    expect(nextBtn.parentElement?.classList.contains('opacity')).toBeFalsy();
    await userEvent.click(nextBtn);
    expect(mockDate.nextClick).toHaveBeenCalledTimes(1);
    await userEvent.click(prevBtn);
    expect(mockDate.prevClick).toHaveBeenCalledTimes(1);
  });

  test('should change page number', async () => {
    mockDate.pageNum = 2;
    render(<Pagination {...mockDate} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByText('Next').parentElement?.classList.contains('opacity')
    ).toBeFalsy();
    expect(
      screen.getByText('Prev').parentElement?.classList.contains('opacity')
    ).toBeFalsy();
  });

  test('should not change page number if page is 1', async () => {
    mockDate.pageNum = 1;
    render(<Pagination {...mockDate} />);
    const prevBtn = screen.getByText('Prev');
    await userEvent.click(prevBtn);
    expect(mockDate.prevClick).toHaveBeenCalledTimes(2);
    expect(prevBtn.parentElement?.classList.contains('opacity')).toBeTruthy();
  });

  test('should not change page number if is last page', async () => {
    mockDate.hasNextPage = false;
    render(<Pagination {...mockDate} />);
    const nextBtn = screen.getByText('Next');
    await userEvent.click(nextBtn);
    expect(mockDate.nextClick).toHaveBeenCalledTimes(2);
    expect(nextBtn.parentElement?.classList.contains('opacity')).toBeTruthy();
  });
});
