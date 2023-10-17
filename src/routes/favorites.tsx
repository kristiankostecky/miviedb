import { MovieCard } from '@/components/movie-card'
import { ResponsiveGrid } from '@/components/responsive-grid'
import { Heading } from '@/components/ui/heading'
import { PATHS } from '@/utils/constants'
import { useFavorites } from '@/utils/hooks/favorites'
import { Link } from 'react-router-dom'

export function Favorites() {
  const { favorites, handleFavoriteChange } = useFavorites()
  return (
    <section>
      <Heading className="mb-4 text-center">Your favorite movies</Heading>
      {favorites.length > 0 ? (
        <ResponsiveGrid>
          {favorites.map((movie) => {
            return (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onFavoriteChange={handleFavoriteChange}
              />
            )
          })}
        </ResponsiveGrid>
      ) : (
        <p className="text-center">
          You do not have any favorite movies yet.
          <br />
          Try to add some from the{' '}
          <Link className="text-primary hover:underline" to={PATHS.SEARCH}>
            search page
          </Link>
        </p>
      )}
    </section>
  )
}
