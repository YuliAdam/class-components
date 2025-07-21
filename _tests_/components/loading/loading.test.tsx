import { render, screen } from '@testing-library/react';
import Loading from '../../../src/components/loading/Loading';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';

describe('loading test', () => {
  test('loads and displays loading', async () => {
    render(<Loading />);
    expect(await screen.findByAltText('loading...')).toBeInTheDocument();
  });
});
