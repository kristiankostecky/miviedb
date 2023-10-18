import { Movie, useFavorites } from './favorites'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

const movieA: Movie = {
  Poster: 'https://via.placeholder.com/300x450',
  Title: 'Movie A',
  Type: 'movie',
  Year: '2021',
  imdbID: '1',
  isFavorite: true,
}

const movieB: Movie = {
  Poster: 'https://via.placeholder.com/300x450',
  Title: 'Movie B',
  Type: 'movie',
  Year: '2021',
  imdbID: '2',
  isFavorite: true,
}

describe('useFavorites', () => {
  beforeEach(() => {
    global.localStorage.clear()
  })
  it('can add favorite', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(movieA)
    })
    expect(result.current.favorites).toEqual([movieA])
  })
  it('can remove favorite', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(movieA)
    })
    act(() => {
      result.current.addFavorite(movieB)
    })
    expect(result.current.favorites).toEqual([movieB, movieA])

    act(() => {
      result.current.removeFavorite(movieA.imdbID)
    })
    expect(result.current.favorites).toEqual([movieB])
  })

  it('can check if a movie is a favorite', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(movieA)
    })

    expect(result.current.isFavorite(movieA.imdbID)).toBe(true)
    expect(result.current.isFavorite(movieB.imdbID)).toBe(false)
  })
})
