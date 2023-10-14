import { MoviesGrid } from '@/components/MoviesGrid'
import { Heading } from '@/components/ui/heading'

export function Favorites() {
  return (
    <div>
      <Heading className="mb-4 text-center">Your favorite movies</Heading>
      <MoviesGrid movies={[]} />
    </div>
  )
}
