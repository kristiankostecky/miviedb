import { MoviesGrid } from '@/components/MoviesGrid'

const movies = [
  {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZWQ3ZDQ3MTYtZWUyOS00YmFhLTllOWItNzNmNjE0ZDI5YWE5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
    Title: 'You Are So Not Invited to My Bat Mitzvah',
    Type: 'movie',
    Year: '2023',
    imdbID: 'tt21276878',
  },
  {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMmRhY2Y4NmItNzkxNi00MjEwLWJiODctYWViMjY5OTQ0YTJlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
    Title: 'Bat*21',
    Type: 'movie',
    Year: '1988',
    imdbID: 'tt0094712',
  },
  {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZWZmM2Y3OWMtNDllMC00YjY5LWFkZWItNDU4NzNlMmU4NTgwXkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_SX300.jpg',
    Title: 'The Bat',
    Type: 'movie',
    Year: '1959',
    imdbID: 'tt0052602',
  },
  {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZWE4MjhjMDItZmQ5Yy00OTQxLWE0M2EtZTJiMTFhMzc1NjJjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    Title: 'The Devil Bat',
    Type: 'movie',
    Year: '1940',
    imdbID: 'tt0032390',
  },
  {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BY2Q1NWZlOWQtOGQwMS00YjUyLTlkZDctNTQ5ZjRlNGE1ZDI1XkEyXkFqcGdeQXVyNjc0MzMzNjA@._V1_SX300.jpg',
    Title: 'The Vampire Bat',
    Type: 'movie',
    Year: '1933',
    imdbID: 'tt0024727',
  },
]

export function Movies() {
  return <MoviesGrid movies={movies} />
}
