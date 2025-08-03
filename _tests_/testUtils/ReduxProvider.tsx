import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import React from 'react';

export default function ReduxProvider({ child }: { child: React.ReactNode }) {
  return <Provider store={store}>{child}</Provider>;
}
