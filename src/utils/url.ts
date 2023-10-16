export const getSearchParams = <TKeys extends ReadonlyArray<string>>(
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
