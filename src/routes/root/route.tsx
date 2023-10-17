import { Heading } from '@/components/ui/heading'
import { PATHS } from '@/utils/constants'
import { Link, Outlet, useMatch } from 'react-router-dom'

export function Root() {
  const isMatch = useMatch(PATHS.ROOT)

  return (
    <div className="flex h-full flex-col">
      <nav className="sticky top-0 z-50 mx-0 flex h-20 flex-shrink-0 items-center justify-between gap-4 bg-white px-20 shadow-sm">
        <div className="flex gap-4">
          <Link to={PATHS.ROOT}>Home</Link>
          <Link to={PATHS.SEARCH}>Search</Link>
          <Link to={PATHS.FAVORITES}>Favorites</Link>
        </div>
        <div className="flex gap-4">TODO: Night mode here</div>
      </nav>
      <div className="container mt-8 flex-1">
        {isMatch && (
          <section className="flex flex-col items-center gap-6">
            <Heading>Welcome to movie DB app</Heading>
            <p>
              This is a demo app that uses{' '}
              <a
                className="text-primary hover:underline"
                href="https://www.omdbapi.com/"
                rel="noreferrer"
                target="_blank"
              >
                OMDB API
              </a>{' '}
              to search for movies and add them to favorites.
            </p>
          </section>
        )}
        <Outlet />
      </div>
    </div>
  )
}