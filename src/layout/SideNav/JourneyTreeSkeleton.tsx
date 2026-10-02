/**
 * Renders the loading state inside an expanded Journey resource.
 *
 * @returns The Journey tree loading skeleton.
 */
const JourneyTreeSkeleton = () => {
  return (
    <div className="space-y-2 px-9 py-3">
      <div className="h-3 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-3/5 animate-pulse rounded bg-slate-100" />
    </div>
  )
}

export default JourneyTreeSkeleton
