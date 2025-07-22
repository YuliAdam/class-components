import { PATH } from '../configs/routesConfig';
import { lazy } from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import { Layout } from '../layout/layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <>
        <p>Page not Found</p>
        <Link to={PATH.empty}>Back</Link>
      </>
    ),
    children: [
      {
        path: PATH.empty,
        Component: lazy(() => import('../components/Main')),
      },
      {
        path: PATH.about,
        element: <div>About</div>,
      },
      {
        path: PATH.searchParam,
        Component: lazy(() => import('../components/Main')),
      },
      {
        path: PATH.item,
        Component: lazy(() => import('../components/Main')),
      },
    ],
  },
]);
