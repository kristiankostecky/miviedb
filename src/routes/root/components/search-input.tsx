import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PATHS } from '@/utils/constants'
import { getSearchParams } from '@/utils/url'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDebounce } from 'react-use'

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { search } = getSearchParams(searchParams, ['search'])
  const [inputValue, setInputValue] = useState(search || '')
  const navigate = useNavigate()
  const location = useLocation()

  useDebounce(
    () => {
      if (inputValue === '' && search === null) {
        return
      }

      if (location.pathname === PATHS.SEARCH) {
        setSearchParams({
          search: inputValue,
        })
      } else {
        navigate({
          pathname: PATHS.SEARCH,
          search: new URLSearchParams({
            search: inputValue,
          }).toString(),
        })
      }
    },
    500,
    [inputValue]
  )
  return (
    <>
      <Label className="sr-only" htmlFor="search">
        Search movies
      </Label>
      <Input
        id="search"
        placeholder="Search movies..."
        type="search"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
          if (event.target.value === '') {
            setSearchParams({})
          }
        }}
      />
    </>
  )
}
