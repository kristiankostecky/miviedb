import './index.css'
import { Favorites } from './routes/favorites'
import { Movie, movieLoader } from './routes/movie/route'
import { Movies, moviesLoader } from './routes/movies'
import { Root } from './routes/root/route'
import { PATHS } from './utils/constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom'
import { ValiError } from 'valibot'

function ErrorBoundary({ message }: { message?: string }) {
  const error = useRouteError()

  console.error(error)
  const errorMessage =
    error instanceof ValiError ? (
      error.message
    ) : (
      <>
        Oops. Something went wrong 📡. <br /> Try to reload the page.
      </>
    )

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-center">{message || errorMessage}</p>
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10, // 10 seconds
    },
  },
})

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Movies />,
        errorElement: <ErrorBoundary />,
        loader: moviesLoader(queryClient),
        path: PATHS.SEARCH,
      },
    ],
    element: <Root />,
    errorElement: <ErrorBoundary />,
    path: PATHS.ROOT,
  },
  {
    element: <Movie />,
    errorElement: <ErrorBoundary />,
    loader: movieLoader(queryClient),
    path: PATHS.MOVIE,
  },
  {
    children: [{ element: <Movies />, path: '' }],
    element: <Favorites />,
    path: PATHS.FAVORITES,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="container h-full py-10">
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
)
