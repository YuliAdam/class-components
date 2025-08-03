import React from 'react';
import { MemoryRouter } from 'react-router';

export default function RouterProvider({ child }: { child: React.ReactNode }) {
  return <MemoryRouter>{child}</MemoryRouter>;
}
