import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { InfoCircledIcon, StarIcon } from '@radix-ui/react-icons'

export function MovieCard({
  movie,
}: {
  movie: {
    Poster: string
    Title: string
    Type: string
    Year: string
  }
}) {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-md bg-gray-100">
      <img
        alt={movie.Title}
        className="h-full w-full rounded-md object-cover"
        src={movie.Poster}
      />
      <div className="absolute flex h-full w-full flex-col justify-between bg-gradient-to-t from-black via-black via-10% p-4">
        <Button
          aria-label="Add to favorites"
          className="self-end rounded-full"
          size="icon"
          variant="outline"
          onClick={() => {
            // TODO: toggle favorite
          }}
        >
          <StarIcon />
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
          {/* TODO: Add link logic */}
          <Button aria-label="View movie info" className="shrink-0" size="icon">
            <InfoCircledIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
