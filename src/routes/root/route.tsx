import { SearchInput } from './components/search-input'
import { Heading } from '@/components/ui/heading'
import { PATHS } from '@/utils/constants'
import { Outlet, useMatch } from 'react-router-dom'

export function Root() {
  const isMatch = useMatch(PATHS.ROOT)

  return (
    <section className="flex flex-col items-center gap-6">
      <Heading as="h1">Movie DB</Heading>
      <div className="mx-auto w-full max-w-sm">
        <SearchInput />
      </div>
      {isMatch && <p>Use the search bar to find movies</p>}
      <Outlet />
    </section>
  )
}
