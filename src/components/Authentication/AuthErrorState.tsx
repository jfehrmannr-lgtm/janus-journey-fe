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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-sm">
        <h1 className="text-lg font-semibold text-slate-950">Unable to resolve your Janus account</h1>
        <p className="mt-2 text-sm text-slate-500">Please try again or return to sign in.</p>
        <button
          className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
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
