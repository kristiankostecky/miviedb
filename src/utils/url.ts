import { safeParse, string, url } from 'valibot'

type QuerySearchParam = 'q'
type PageSearchParam = 'page'

export type SearchParam = PageSearchParam | QuerySearchParam

export const getSearchParams = <TKeys extends ReadonlyArray<SearchParam>>(
  searchParams: URLSearchParams,
  keys: TKeys
) => {
  return keys.reduce(
    (acc, key) => {
      return {
        ...acc,
        [key]: searchParams.get(key),
      }
    },
    {} as { [K in TKeys[number]]: ReturnType<URLSearchParams['get']> }
  )
}

export const parseUrl = (urlToParse: string, fallbackUrl: string) => {
  const movieUrl = safeParse(string([url()]), urlToParse)
  if (movieUrl.success) {
    return movieUrl.output
  }
  return fallbackUrl
}
