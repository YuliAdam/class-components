import { PATH } from '../configs/routesConfig';
import { lazy } from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import { Layout } from '../layout/layout';
import ErrorContent from '../components/error/ErrorContent';
import Main from '../pages/Main';
import Results from '../pages/Results';

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
        Component: lazy(() => import('../pages/Results')),
      },
      {
        path: PATH.about,
        Component: lazy(() => import('../components/about/About')),
      },
      {
        element: <Main />,
        children: [
          {
            element: <Results />,
            children: [
              {
                path: PATH.pokemon,
                element: null,
              },
              {
                path: PATH.item,
                Component: lazy(() => import('../pages/SelectPokemon')),
              },
            ],
          },
          {
            path: PATH.pokemonNotFound,
            Component: lazy(() => import('../pages/PokemonNotFound')),
          },
        ],
      },
      {
        path: PATH.notFound,
        element: <ErrorContent text="Page not found" />,
      },
    ],
  },
]);
