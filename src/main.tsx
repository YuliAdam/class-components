import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  getAllRequest,
  getByNameOrIndexRequest,
  requestOptions,
} from './service/api.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

getAllRequest(requestOptions.ability)
  .then((res) => res.json())
  .then((res) => console.log(res));

getByNameOrIndexRequest(requestOptions.ability, 1)
  .then((res) => res && res.json())
  .then((res) => console.log(res));
