import { MovieCard } from './MovieCard'

export function MoviesGrid({
  movies,
}: {
  movies: Array<{
    Poster: string
    Title: string
    Type: string
    Year: string
    imdbID: string
  }>
}) {
  return (
    <div className="grid w-full auto-rows-[400px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}
