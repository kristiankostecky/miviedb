import { BaseSchema, parse } from 'valibot'

const defaultFetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export type ValibotSchema<TData> = BaseSchema<TData>

export function valibotFetch<TData>(
  schema: ValibotSchema<TData>,
  ...args: Parameters<typeof defaultFetcher>
) {
  return defaultFetcher(...args).then((data) => parse(schema, data))
}
