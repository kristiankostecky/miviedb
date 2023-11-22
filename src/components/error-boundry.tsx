import { useRouteError } from 'react-router-dom'
import { ValiError } from 'valibot'

export function ErrorBoundary({ message }: { message?: string }) {
  const error = useRouteError()
  // const unusedVar = 'unused-v2'

  console.error(error)
  const errorMessage =
    error instanceof ValiError ? (
      error.message
    ) : (
      <>
        Oops. Something went wrong 📡. <br /> Try to reload the page.
      </>
    )

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-center">{message || errorMessage}</p>
    </div>
  )
}
