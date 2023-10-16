import { omdb } from '@/api/omdb'
import { MovieCard } from '@/components/movie-card'
import { ResponsiveGrid } from '@/components/responsive-grid'
import { useQueryWithLoader } from '@/lib/hooks/useQueryWithLoader'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/utils/hooks/favorites'
import { getSearchParams } from '@/utils/url'
import { QueryClient } from '@tanstack/react-query'
import {
  LoaderFunctionArgs,
  redirect,
  useNavigation,
  useSearchParams,
} from 'react-router-dom'
import { ValiError, nullable, object, parse, string } from 'valibot'

const searchParamsParser = (searchParams: URLSearchParams) => {
  return parse(
    object({
      page: nullable(string()),
      search: string(),
    }),
    getSearchParams(searchParams, ['page', 'search'])
  )
}

const moviesQuery = (...args: Parameters<typeof omdb.search>) => ({
  queryFn: () => {
    return omdb.search(...args)
  },
  queryKey: ['movies', ...args] as const,
})

export const moviesLoader =
  (queryClient: QueryClient) =>
  ({ request }: LoaderFunctionArgs) => {
    try {
      const { page, search } = searchParamsParser(
        new URL(request.url).searchParams
      )

      const query = moviesQuery(search, page || undefined)
      return queryClient.ensureQueryData(query)
    } catch (error) {
      if (error instanceof ValiError) {
        throw redirect('/')
      }
      throw error
    }
  }

export function Movies() {
  const [searchParams] = useSearchParams()
  const { search } = searchParamsParser(searchParams)
  const { data: movies } = useQueryWithLoader<typeof moviesLoader>(
    moviesQuery(search)
  )
  const navigation = useNavigation()

  const { handleFavoriteChange, isFavorite } = useFavorites()

  if (!search) {
    return <div>Search for movies</div>
  }

  if ('Error' in movies) {
    return <div>{movies.Error}</div>
  }

  return (
    <ResponsiveGrid
      className={cn(navigation.state === 'loading' && 'opacity-40')}
    >
      {movies.Search.map((movie) => {
        const isMovieFavorite = isFavorite(movie.imdbID)
        return (
          <MovieCard
            key={movie.imdbID}
            movie={{ isFavorite: isMovieFavorite, ...movie }}
            onFavoriteChange={handleFavoriteChange}
          />
        )
      })}
    </ResponsiveGrid>
  )
}
