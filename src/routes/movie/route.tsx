import { ExtraInfo } from './components/ExtraInfo'
import { Rating } from './components/Rating'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

const MOVIE = {
  Actors: 'Lionel Atwill, Fay Wray, Melvyn Douglas',
  Awards: 'N/A',
  BoxOffice: 'N/A',
  Country: 'United States',
  DVD: '01 Jul 2016',
  Director: 'Frank R. Strayer',
  Genre: 'Drama, Horror, Mystery',
  Language: 'English',
  Metascore: 'N/A',
  Plot: 'When corpses drained of blood begin to show up in a European village, vampirism is suspected to be responsible.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BY2Q1NWZlOWQtOGQwMS00YjUyLTlkZDctNTQ5ZjRlNGE1ZDI1XkEyXkFqcGdeQXVyNjc0MzMzNjA@._V1_SX300.jpg',
  Production: 'N/A',
  Rated: 'Passed',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '5.7/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '67%',
    },
  ],
  Released: '10 Jan 1933',
  Response: 'True',
  Runtime: '65 min',
  Title: 'The Vampire Bat',
  Type: 'movie',
  Website: 'N/A',
  Writer: 'Edward T. Lowe Jr.',
  Year: '1933',
  imdbID: 'tt0024727',
  imdbRating: '5.7',
  imdbVotes: '2,874',
}

type Rating = {
  Source: string
  Value: string
}

type Movie = {
  Actors: string
  Awards: string
  BoxOffice: string
  Country: string
  DVD: string
  Director: string
  Genre: string
  Language: string
  Metascore: string
  Plot: string
  Poster: string
  Production: string
  Rated: string
  Ratings: Array<Rating>
  Released: string
  Response: string
  Runtime: string
  Title: string
  Type: string
  Website: string
  Writer: string
  Year: string
  imdbID: string
  imdbRating: string
  imdbVotes: string
}

export function Movie() {
  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
      <Button
        aria-label="Navigate back"
        className="absolute left-0 top-0 sm:left-4 sm:top-4"
        size="icon"
        variant="secondary"
      >
        <ArrowLeftIcon />
      </Button>
      <div className="-mx-8 -mt-10 sm:m-0">
        <img
          alt={MOVIE.Title}
          className="h-full min-h-full w-full object-contain sm:max-h-[80vh]"
          src={MOVIE.Poster}
        />
      </div>
      <div className="flex flex-col p-4">
        <ul className="flex gap-2">
          {MOVIE.Genre.split(', ').map((genre) => (
            <li key={genre}>
              <Badge variant="outline">{genre}</Badge>
            </li>
          ))}
        </ul>
        <Heading className="mt-2">{MOVIE.Title}</Heading>
        <ExtraInfo
          info={[
            { label: 'Released at', value: MOVIE.Released },
            { label: 'Country', value: MOVIE.Country },
            { label: 'Director', value: MOVIE.Director },
            { label: 'Writer', value: MOVIE.Writer },
            { label: 'Runtime', value: MOVIE.Runtime },
          ]}
        />
        <p className="mt-8 text-justify">{MOVIE.Plot}</p>
        <div>
          <Heading as="h2" className="mt-8" size="h4">
            Ratings
          </Heading>
          <ul className="mt-2 flex gap-2">
            {MOVIE.Ratings.map((rating) => {
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
          {MOVIE.Actors.split(', ').map((actor) => {
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
