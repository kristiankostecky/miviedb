import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetSearchParams } from '@/lib/hooks/useGetSearchParams'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce, useFirstMountState } from 'react-use'

export function SearchInput() {
  const setSearchParams = useSearchParams()[1]
  const { q: search } = useGetSearchParams(['q'])
  const [inputValue, setInputValue] = useState(search || '')
  const isFirstMount = useFirstMountState()

  useDebounce(
    () => {
      if (isFirstMount) {
        return
      }
      if (inputValue) {
        setSearchParams({
          q: inputValue,
        })
      }
    },
    500,
    [inputValue]
  )

  useEffect(() => {
    // when input is filled and user navigates to `/search` input value is cleared
    if (!search) {
      setInputValue('')
    }
  }, [search])

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
