import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

export default class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}
