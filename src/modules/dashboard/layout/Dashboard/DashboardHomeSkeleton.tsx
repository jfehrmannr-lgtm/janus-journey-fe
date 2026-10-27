/**
 * Renders the loading state for Dashboard Home.
 *
 * @returns The Dashboard Home loading skeleton.
 */
const DashboardHomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-surface-page px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
        <div className="h-44 animate-pulse rounded-2xl bg-surface" />
        <div className="h-96 animate-pulse rounded-2xl bg-surface" />
        <div className="h-128 animate-pulse rounded-2xl bg-surface" />
      </div>
    </div>
  )
}

export default DashboardHomeSkeleton
