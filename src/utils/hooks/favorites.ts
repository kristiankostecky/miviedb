import { MovieBySearch } from '@/api/omdb'
import { useLocalStorage } from 'react-use'

export interface Movie extends MovieBySearch {
  isFavorite: boolean
}

export type HandleFavoriteChange = (params: {
  action: 'add' | 'remove'
  movie: Movie
}) => void

export function useFavorites() {
  const [favorites = [], setFavorites] =
    useLocalStorage<Array<Movie>>('favorites')

  const addFavorite = (movie: Movie) => {
    setFavorites([movie, ...favorites])
  }
  const removeFavorite = (imdbID: string) => {
    setFavorites(favorites.filter((movie) => movie.imdbID !== imdbID))
  }
  const isFavorite = (id: string) => {
    return favorites.some((movie) => movie.imdbID === id)
  }

  const handleFavoriteChange: HandleFavoriteChange = ({ action, movie }) => {
    if (action === 'add') {
      return addFavorite(movie)
    }
    if (action === 'remove') {
      return removeFavorite(movie.imdbID)
    }

    throw new Error('Invalid action')
  }

  return {
    addFavorite,
    favorites,
    handleFavoriteChange,
    isFavorite,
    removeFavorite,
  }
}
