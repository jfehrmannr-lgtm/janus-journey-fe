/**
 * Renders the loading state for Dashboard Home.
 *
 * @returns The Dashboard Home loading skeleton.
 */
const DashboardHomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-surface-page p-6 sm:p-10 lg:p-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="h-12 w-full max-w-2xl animate-pulse rounded-xl bg-white" />
        <div className="space-y-3">
          <div className="h-10 w-80 animate-pulse rounded-lg bg-surface-subtle" />
          <div className="h-5 w-96 animate-pulse rounded bg-surface-subtle" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
        </div>
        <div className="h-80 animate-pulse rounded-2xl bg-white" />
      </div>
    </div>
  )
}

export default DashboardHomeSkeleton
