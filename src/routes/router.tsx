import { PATH } from '../configs/routesConfig';
import { lazy } from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import { Layout } from '../layout/layout';
import ErrorContent from '../components/error/ErrorContent';
import About from '../components/about/About';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <>
        <p>Page not Found</p>
        <Link to={PATH.empty.replace(':num', '1')}>Back</Link>
      </>
    ),
    children: [
      {
        path: PATH.empty,
        Component: lazy(() => import('../components/Main')),
      },
      {
        path: PATH.page,
        Component: lazy(() => import('../components/Main')),
        children: [
          {
            path: PATH.searchParam,
            Component: lazy(() => import('../components/Main')),
          },
          {
            path: PATH.item,
            Component: lazy(() => import('../components/Main')),
          },
          {
            path: PATH.searchItem,
            Component: lazy(() => import('../components/Main')),
          },
        ],
      },
      {
        path: PATH.about,
        element: <About />,
      },
      {
        path: PATH.notFound,
        element: <ErrorContent text="Page not found" />,
      },
    ],
  },
]);
