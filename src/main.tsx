import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';

const rootElement = document.createElement('div');
rootElement.classList.add('body_wrap');
document.body.prepend(rootElement);
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
