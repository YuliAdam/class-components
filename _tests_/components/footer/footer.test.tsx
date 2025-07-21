import { render, screen } from '@testing-library/react';
import Footer, { gitHubInfo } from '../../../src/components/footer/Footer';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';

describe('footer test', () => {
  test('loads and displays footer', async () => {
    render(<Footer />);
    expect(screen.getByText(`${gitHubInfo.text}`)).toBeInTheDocument();
    expect(
      screen.getByText(`/${gitHubInfo.year}/${gitHubInfo.schoolName}`)
    ).toBeInTheDocument();
    expect(await screen.findAllByRole('link')).toHaveLength(3);
  });
});
