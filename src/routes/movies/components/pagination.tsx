import { Button } from '@/components/ui/button'
import { Link, To } from 'react-router-dom'

export function Pagination({
  currentPage,
  nextPagePath,
  previousPagePath,
  totalPages,
}: {
  currentPage: number
  nextPagePath: To
  previousPagePath: To
  totalPages: number
}) {
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <nav
      aria-label="pagination"
      className="mt-4 flex flex-col items-center justify-center py-4 sm:flex-row"
    >
      {hasPreviousPage ? (
        <Button asChild>
          <Link to={previousPagePath}>Previous page</Link>
        </Button>
      ) : (
        <Button disabled>Previous page</Button>
      )}
      <div className="m-4 flex items-center">
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
      {hasNextPage ? (
        <Button asChild>
          <Link to={nextPagePath}>Next page</Link>
        </Button>
      ) : (
        <Button disabled>Next page</Button>
      )}
    </nav>
  )
}
