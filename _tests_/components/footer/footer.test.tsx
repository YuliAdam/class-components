import { render, screen } from '@testing-library/react';
import Footer, { gitHubInfo } from '../../../src/components/footer/Footer';
import { expect, test } from 'vitest';

test('loads and displays footer', async () => {
  render(<Footer />);
  expect(screen.getByText(`${gitHubInfo.text}`)).toBeTruthy();
  expect(
    screen.getByText(`/${gitHubInfo.year}/${gitHubInfo.schoolName}`)
  ).toBeTruthy();
  expect(await screen.findAllByRole('link')).toHaveLength(3);
});
