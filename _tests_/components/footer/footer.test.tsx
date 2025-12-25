import { render, screen } from '@testing-library/react';
import Footer from '../../../src/components/footer/Footer';
import { describe, expect, test } from 'vitest';
import ReduxProvider from '../../testUtils/ReduxProvider';
import '@testing-library/jest-dom';
import { gitHubInfo } from '../../../src/assets/authorInfo';

describe('footer test', () => {
  test('loads and displays footer', async () => {
    render(<ReduxProvider child={<Footer />} />);
    expect(screen.getByText(`${gitHubInfo.text}`)).toBeInTheDocument();
    expect(
      screen.getByText(`/${gitHubInfo.year}/${gitHubInfo.schoolName}`)
    ).toBeInTheDocument();
    expect(await screen.findAllByRole('link')).toHaveLength(3);
  });
});
