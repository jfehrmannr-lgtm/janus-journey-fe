/**
 * Renders the loading state for Dashboard Home.
 *
 * @returns The Dashboard Home loading skeleton.
 */
const DashboardHomeSkeleton = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading your workspace"
      className="min-h-screen bg-surface-page px-4 py-4 sm:px-6 sm:py-6"
      role="status"
    >
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-border bg-surface p-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="h-7 w-56 animate-pulse rounded-lg bg-surface-subtle sm:h-9 sm:w-72" />
              <div className="h-4 w-64 animate-pulse rounded bg-surface-subtle sm:w-80" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-28 animate-pulse rounded-lg bg-surface-subtle" />
              <div className="hidden h-10 w-24 animate-pulse rounded-lg bg-surface-subtle sm:block" />
              <div className="hidden h-10 w-20 animate-pulse rounded-lg bg-surface-subtle sm:block" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
          <div className="space-y-3">
            <div className="h-7 w-40 animate-pulse rounded-lg bg-surface-subtle" />
            <div className="h-4 w-52 animate-pulse rounded bg-surface-subtle" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-44 animate-pulse rounded-xl bg-surface-subtle" />
            <div className="hidden h-44 animate-pulse rounded-xl bg-surface-subtle md:block" />
            <div className="hidden h-44 animate-pulse rounded-xl bg-surface-subtle lg:block" />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="h-7 w-44 animate-pulse rounded-lg bg-surface-subtle" />
              <div className="h-4 w-60 animate-pulse rounded bg-surface-subtle" />
            </div>
            <div className="h-10 w-64 animate-pulse rounded-xl bg-surface-subtle" />
          </div>
          <div className="mt-5 h-64 animate-pulse rounded-xl bg-surface-subtle sm:h-80" />
        </section>
      </div>
    </div>
  )
}

export default DashboardHomeSkeleton
