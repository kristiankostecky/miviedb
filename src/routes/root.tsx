import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Outlet } from 'react-router-dom'

export function Root() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Heading as="h1">Movie DB</Heading>
      <div className="mx-auto w-full max-w-sm">
        <Label className="sr-only" htmlFor="search">
          Search movies
        </Label>
        <Input id="search" placeholder="Search movies..." type="search" />
      </div>
      <Outlet />
    </div>
  )
}
