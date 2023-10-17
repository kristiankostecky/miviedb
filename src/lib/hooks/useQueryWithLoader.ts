import {
  QueryClient,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query'
import { LoaderFunction, useLoaderData } from 'react-router-dom'

type QueryClientLoader = (queryClient: QueryClient) => LoaderFunction

type LoaderReturnType<TLoaderFunction extends QueryClientLoader> = Awaited<
  ReturnType<ReturnType<TLoaderFunction>>
>

export const useQueryWithLoader = <
  TQueryFnData extends QueryClientLoader,
  TError = unknown,
  TData = LoaderReturnType<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<
    LoaderReturnType<TQueryFnData>,
    TError,
    TData,
    TQueryKey
  >
) => {
  // https://tkdodo.eu/blog/react-query-meets-react-router#a-typescript-tip
  const initialData = useLoaderData() as LoaderReturnType<TQueryFnData>
  return useQuery({ ...options, initialData })
}
