import BrandLogo from '@/components/BrandLogo/BrandLogo'

/**
 * Renders the shared Janus authentication loading state.
 *
 * @returns The authentication loading state.
 */
const AuthLoadingState = () => {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-surface-page px-6"
      role="status"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative flex size-24 items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-primary/20 motion-safe:animate-ping"
          />
          <div className="relative rounded-2xl border border-border bg-surface p-3 shadow-sm">
            <BrandLogo compact size="md" />
          </div>
        </div>
        <p className="mt-6 text-base font-medium text-text-strong">Resolving your Janus account</p>
        <p className="mt-2 text-sm text-text-muted">Getting your workspace ready...</p>
      </div>
    </div>
  )
}

export default AuthLoadingState
