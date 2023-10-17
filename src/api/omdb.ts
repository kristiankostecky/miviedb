import { ValibotSchema, valibotFetch } from '@/lib/valibot-fetch'
import { ENV } from '@/utils/constants'
import { pickBy } from '@/utils/object'
import {
  Output,
  array,
  coerce,
  number,
  object,
  optional,
  string,
  union,
} from 'valibot'

const API_URL = `https://www.omdbapi.com/?apikey=${ENV.VITE_OMDB_API_KEY}`

const omdbFetch = <TData>({
  params,
  schema,
}: {
  params: {
    /**
     * A valid IMDb ID (e.g. tt1285016)
     */
    i?: string
    /**
     * Page number to return
     */
    page?: string
    /**
     * Movie title to search for.
     */
    s?: string
  }
  schema: ValibotSchema<TData>
}) => {
  return valibotFetch(
    schema,
    `${API_URL}&${new URLSearchParams(pickBy(params)).toString()}`
  )
}

const movieBySearchSchema = object({
  Poster: string(),
  Title: string(),
  Type: string(),
  Year: string(),
  imdbID: string(),
})

export type MovieBySearch = Output<typeof movieBySearchSchema>

const search = (title: string, page?: string) => {
  const params = {
    page,
    s: title,
  }
  const schema = union([
    object({
      Error: string(),
      Response: string(),
    }),
    object({
      Search: array(
        object({
          Poster: string(),
          Title: string(),
          Type: string(),
          Year: string(),
          imdbID: string(),
        })
      ),
      totalResults: coerce(number(), (value) => Number(value)),
    }),
  ])

  return omdbFetch({
    params,
    schema,
  })
}

const movieByIdSchema = object({
  Actors: string(),
  Awards: string(),
  BoxOffice: optional(string()),
  Country: string(),
  DVD: optional(string()),
  Director: string(),
  Genre: string(),
  Language: string(),
  Metascore: string(),
  Plot: string(),
  Poster: string(),
  Production: optional(string()),
  Rated: string(),
  Ratings: array(
    object({
      Source: string(),
      Value: string(),
    })
  ),
  Released: string(),
  Response: string(),
  Runtime: string(),
  Title: string(),
  Type: string(),
  Website: optional(string()),
  Writer: string(),
  Year: string(),
  imdbID: string(),
  imdbRating: string(),
  imdbVotes: string(),
  totalSeasons: optional(string()),
})

const movieById = (id: string) => {
  return omdbFetch({
    params: {
      i: id,
    },
    schema: movieByIdSchema,
  })
}

export const omdb = {
  movieById,
  search,
}
