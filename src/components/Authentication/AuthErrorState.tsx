'use client'

import { useRouter } from 'next/navigation'

/**
 * Renders a recoverable Janus authentication error.
 *
 * @returns The authentication error state.
 */
const AuthErrorState = () => {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-page px-6">
      <div className="max-w-md rounded-2xl border border-danger-border bg-surface p-6 text-center shadow-sm">
        <h1 className="text-lg font-semibold text-text-primary">Unable to resolve your Janus account</h1>
        <p className="mt-2 text-sm text-text-muted">Please try again or return to sign in.</p>
        <button
          className="mt-5 rounded-lg bg-action px-4 py-2 text-sm font-semibold text-white"
          onClick={() => router.refresh()}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default AuthErrorState
