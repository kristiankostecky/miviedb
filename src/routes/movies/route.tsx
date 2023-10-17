import { Pagination } from './components/pagination'
import { omdb } from '@/api/omdb'
import { MovieCard } from '@/components/movie-card'
import { ResponsiveGrid } from '@/components/responsive-grid'
import { Spinner } from '@/components/ui/spinner'
import { useQueryWithLoader } from '@/lib/hooks/useQueryWithLoader'
import { cn } from '@/lib/utils'
import { PATHS } from '@/utils/constants'
import { useFavorites } from '@/utils/hooks/favorites'
import { getSearchParams } from '@/utils/url'
import { QueryClient } from '@tanstack/react-query'
import {
  LoaderFunctionArgs,
  useNavigation,
  useSearchParams,
} from 'react-router-dom'
import { nullable, object, parse, string } from 'valibot'

const searchParamsParser = (searchParams: URLSearchParams) => {
  return parse(
    object({
      page: nullable(string()),
      q: nullable(string()),
    }),
    getSearchParams(searchParams, ['page', 'q'])
  )
}

const moviesQuery = (...args: Parameters<typeof omdb.search>) => ({
  queryFn: () => {
    if (args[0]) {
      return omdb.search(...args)
    }

    const emptyResponse = {
      Search: [],
      totalResults: 0,
    } satisfies Awaited<ReturnType<typeof omdb.search>>
    return emptyResponse
  },
  queryKey: ['movies', ...args] as const,
})

export const moviesLoader =
  (queryClient: QueryClient) =>
  ({ request }: LoaderFunctionArgs) => {
    const { page, q: search } = searchParamsParser(
      new URL(request.url).searchParams
    )

    const query = moviesQuery(search ?? '', page || undefined)
    return queryClient.ensureQueryData(query)
  }

export function Movies() {
  const [searchParams] = useSearchParams()
  const { page: pageParam, q: searchParam } = searchParamsParser(searchParams)
  const { data } = useQueryWithLoader<typeof moviesLoader>(
    moviesQuery(searchParam ?? '', pageParam || undefined)
  )
  const page = Number(pageParam) || 1
  const navigation = useNavigation()

  const { handleFavoriteChange, isFavorite } = useFavorites()

  if ('Error' in data) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <p className="mt-4 text-center">{data.Error} 📺</p>
      </div>
    )
  }

  const isLoading = navigation.state === 'loading'

  return (
    <div className="mt-4 flex-1">
      {!searchParam && isLoading && (
        <div className="flex h-full flex-1 items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      <ResponsiveGrid className={cn(isLoading && 'opacity-40')}>
        {data.Search.map((movie) => {
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

      {searchParam && data.totalResults > 0 && (
        <Pagination
          currentPage={page}
          nextPagePath={{
            pathname: PATHS.SEARCH,
            search: new URLSearchParams({
              page: (page + 1).toString(),
              search: searchParam ?? '',
            }).toString(),
          }}
          previousPagePath={{
            pathname: PATHS.SEARCH,
            search: new URLSearchParams({
              page: (page - 1).toString(),
              search: searchParam ?? '',
            }).toString(),
          }}
          totalPages={Math.ceil(data.totalResults / 10)}
        />
      )}
    </div>
  )
}
