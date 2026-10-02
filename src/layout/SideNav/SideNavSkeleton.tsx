/**
 * Renders the loading state for the application SideNav.
 *
 * @returns The SideNav loading skeleton.
 */
const SideNavSkeleton = () => {
  return (
    <aside className="flex min-h-20 flex-col gap-6 border-b border-slate-200 bg-white p-6 lg:min-h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-100" />
      <div className="space-y-3">
        <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
      </div>
      <div className="mt-auto h-16 animate-pulse rounded-xl bg-slate-100" />
    </aside>
  )
}

export default SideNavSkeleton
