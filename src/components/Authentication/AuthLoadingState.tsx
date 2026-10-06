/**
 * Renders the shared Janus authentication loading state.
 *
 * @returns The authentication loading state.
 */
const AuthLoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <p className="text-sm text-slate-500">Resolving your Janus account...</p>
    </div>
  )
}

export default AuthLoadingState
