import { MovieCard } from '@/components/movie-card'
import { ResponsiveGrid } from '@/components/responsive-grid'
import { Heading } from '@/components/ui/heading'
import { useFavorites } from '@/utils/hooks/favorites'

export function Favorites() {
  const { favorites, handleFavoriteChange } = useFavorites()
  return (
    <div>
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
        <p className="text-center">You do not have any favorite movies yet.</p>
      )}
    </div>
  )
}
