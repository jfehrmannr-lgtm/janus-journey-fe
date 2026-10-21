'use client'

interface JourneyErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Renders a recoverable WorkSidebar error for unexpected Journey failures.
 *
 * @param error - Unexpected error captured by the route boundary.
 * @param reset - Re-renders the failed route segment.
 * @returns The Journey error UI.
 */
const JourneyError = ({ error, reset }: JourneyErrorProps) => {
  void error

  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center" role="alert">
      <h2 className="text-sm font-semibold text-text-primary">Unable to load this Journey</h2>
      <p className="mt-1 max-w-xs text-sm leading-6 text-text-muted">
        Please try again. The Journey could not be loaded.
      </p>
      <button
        className="mt-4 rounded-lg bg-action px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-action-hover"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  )
}

export default JourneyError
