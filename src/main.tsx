import { ErrorBoundary } from './components/error-boundry'
import { ThemeProvider } from './components/theme-provider'
import './index.css'
import { Root } from './routes/root/route'
import { Search } from './routes/search'
import { PATHS } from './utils/constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          {
            errorElement: <ErrorBoundary />,
            lazy: async () => {
              const { Movies, moviesLoader } = await import(
                './routes/movies/route'
              )
              return {
                Component: Movies,
                loader: moviesLoader(queryClient),
              }
            },
            path: '',
          },
        ],
        element: <Search />,
        errorElement: <ErrorBoundary />,
        path: PATHS.SEARCH,
      },
      {
        errorElement: <ErrorBoundary />,
        lazy: async () => {
          const { Movie, movieLoader } = await import('./routes/movie/route')
          return {
            Component: Movie,
            loader: movieLoader(queryClient),
          }
        },
        path: PATHS.MOVIE,
      },
      {
        errorElement: <ErrorBoundary />,
        lazy: async () => {
          const { Favorites } = await import('./routes/favorites')
          return {
            Component: Favorites,
          }
        },
        path: PATHS.FAVORITES,
      },
    ],
    element: <Root />,
    errorElement: <ErrorBoundary />,
    path: PATHS.ROOT,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
)
