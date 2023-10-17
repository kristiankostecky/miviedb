import { getSearchParams } from '@/utils/url'
import { useSearchParams } from 'react-router-dom'

type QuerySearchParam = 'q'
type PageSearchParam = 'page'

type SearchParam = PageSearchParam | QuerySearchParam

export const useGetSearchParams = <TKeys extends Array<SearchParam>>(
  searchParamKeys: TKeys
) => {
  const [searchParams] = useSearchParams()
  return getSearchParams(searchParams, searchParamKeys)
}
