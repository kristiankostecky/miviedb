import { SearchInput } from './root/components/search-input'
import { Heading } from '@/components/ui/heading'
import { Outlet } from 'react-router-dom'

export function Search() {
  return (
    <section className="flex h-full flex-col">
      <Heading className="mb-4 text-center">Search movies</Heading>
      <div className="mx-auto w-full max-w-sm">
        <SearchInput />
      </div>
      <Outlet />
    </section>
  )
}
