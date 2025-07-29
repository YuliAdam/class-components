import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const rootElement = document.createElement('div');
rootElement.classList.add('body_wrap');
document.body.prepend(rootElement);
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
