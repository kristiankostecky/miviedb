import { ExtraInfo } from './components/ExtraInfo'
import { Rating } from './components/Rating'
import { omdb } from '@/api/omdb'
import MoviePlaceholder from '@/assets/movie-placeholder.jpg'
import { FavoriteButton } from '@/components/favorite-button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { useQueryWithLoader } from '@/lib/hooks/useQueryWithLoader'
import { useFavorites } from '@/utils/hooks/favorites'
import { parseUrl } from '@/utils/url'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { QueryClient } from '@tanstack/react-query'
import { LoaderFunctionArgs, useNavigate, useParams } from 'react-router-dom'
import { object, parse, string } from 'valibot'

const queryParamParser = (params: LoaderFunctionArgs['params']) => {
  return parse(
    object({
      id: string(),
    }),
    params
  )
}

const movieQuery = (...args: Parameters<typeof omdb.movieById>) => ({
  queryFn: () => {
    return omdb.movieById(...args)
  },
  queryKey: ['movie', ...args] as const,
})

export const movieLoader =
  (queryClient: QueryClient) =>
  ({ params }: LoaderFunctionArgs) => {
    const { id } = queryParamParser(params)
    const query = movieQuery(id)
    return queryClient.ensureQueryData(query)
  }

export function Movie() {
  const params = useParams()
  const navigate = useNavigate()
  const { id } = queryParamParser(params)
  const { addFavorite, isFavorite, removeFavorite } = useFavorites()
  const { data: movie } = useQueryWithLoader<typeof movieLoader>(movieQuery(id))

  const isFavoriteMovie = isFavorite(movie.imdbID)

  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
      <Button
        aria-label="Navigate back"
        className="absolute left-0 top-0 z-10 sm:left-4 sm:top-4"
        size="icon"
        variant="secondary"
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowLeftIcon />
      </Button>
      <div className="relative -mx-8 -mt-10 sm:m-0">
        <img
          alt={movie.Title}
          className="h-full min-h-full w-full object-contain sm:max-h-[80vh]"
          src={parseUrl(movie.Poster, MoviePlaceholder)}
        />
        <FavoriteButton
          className="absolute right-8 top-10 z-10 sm:top-4"
          isFavorite={isFavoriteMovie}
          onClick={() => {
            if (isFavoriteMovie) {
              removeFavorite(movie.imdbID)
            } else {
              addFavorite({ ...movie, isFavorite: true })
            }
          }}
        />
      </div>
      <div className="flex flex-col p-4">
        <ul className="flex gap-2">
          {movie.Genre.split(', ').map((genre) => (
            <li key={genre}>
              <Badge variant="outline">{genre}</Badge>
            </li>
          ))}
        </ul>
        <Heading className="mt-2">{movie.Title}</Heading>
        <ExtraInfo
          info={[
            { label: 'Released at', value: movie.Released },
            { label: 'Country', value: movie.Country },
            { label: 'Director', value: movie.Director },
            { label: 'Writer', value: movie.Writer },
            { label: 'Runtime', value: movie.Runtime },
          ]}
        />
        <p className="mt-8 text-justify">{movie.Plot}</p>
        <div>
          <Heading as="h2" className="mt-8" size="h4">
            Ratings
          </Heading>
          <ul className="mt-2 flex gap-2">
            {movie.Ratings.map((rating) => {
              return (
                <li key={rating.Source}>
                  <Rating source={rating.Source} value={rating.Value} />
                </li>
              )
            })}
          </ul>
        </div>
        <Heading as="h2" className="mt-8" size="h4">
          Actors
        </Heading>
        <ul className="mt-2 flex max-w-full gap-6 overflow-auto">
          {movie.Actors.split(', ').map((actor) => {
            const actorInitials = actor.split(' ').map((name) => name[0])
            return (
              <li key={actor} className="flex flex-col items-center ">
                <Avatar>
                  <AvatarFallback>{actorInitials}</AvatarFallback>
                </Avatar>
                <p className="w-min text-center">{actor}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
