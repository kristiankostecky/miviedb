import { MovieBySearch } from '@/api/omdb'
import MoviePlaceholder from '@/assets/movie-placeholder.jpg'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { PATHS } from '@/utils/constants'
import { HandleFavoriteChange } from '@/utils/hooks/favorites'
import { parseUrl } from '@/utils/url'
import {
  InfoCircledIcon,
  StarFilledIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import { Link, generatePath } from 'react-router-dom'

interface Movie extends MovieBySearch {
  isFavorite: boolean
}

export function MovieCard({
  movie,
  onFavoriteChange,
}: {
  movie: Movie
  onFavoriteChange: HandleFavoriteChange
}) {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-md bg-gray-100">
      <img
        alt={movie.Title}
        className="h-full w-full rounded-md object-cover"
        src={parseUrl(movie.Poster, MoviePlaceholder)}
      />
      <div className="absolute flex h-full w-full flex-col justify-between bg-gradient-to-t from-black via-black via-10% p-4">
        <Button
          aria-label={
            movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
          className="self-end rounded-full"
          size="icon"
          variant="outline"
          onClick={() => {
            onFavoriteChange({
              action: movie.isFavorite ? 'remove' : 'add',
              movie: { ...movie, isFavorite: !movie.isFavorite },
            })
          }}
        >
          {movie.isFavorite ? <StarFilledIcon /> : <StarIcon />}
        </Button>
        <div className="flex items-end justify-between gap-4 text-white">
          <div>
            <Badge variant="secondary">{movie.Year}</Badge>
            <Heading
              as="h3"
              className="mt-2 line-clamp-2 h-16 max-h-14"
              size="h4"
            >
              {movie.Title}
            </Heading>
          </div>
          <Button
            aria-label="View movie info"
            asChild
            className="shrink-0"
            size="icon"
          >
            <Link to={generatePath(PATHS.MOVIE, { id: movie.imdbID })}>
              <InfoCircledIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
