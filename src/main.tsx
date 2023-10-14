import './index.css'
import { Favorites } from './routes/favorites'
import { Movie } from './routes/movie/route'
import { Movies } from './routes/movies'
import { Root } from './routes/root'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom'

function ErrorBoundary({ message }: { message?: string }) {
  const error = useRouteError()
  console.error(error)
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-center">
        {message || (
          <>
            Oops. Something went wrong 📡. <br /> Try to reload the page.
          </>
        )}
      </p>
    </div>
  )
}

const router = createBrowserRouter([
  {
    children: [{ element: <Movies />, path: 'movies' }],
    element: <Root />,
    errorElement: <ErrorBoundary />,
    path: '/',
  },
  {
    element: <Movie />,
    path: '/movies/:id',
  },
  {
    children: [{ element: <Movies />, path: '' }],
    element: <Favorites />,
    path: '/favorites',
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="container h-full py-10">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
)
