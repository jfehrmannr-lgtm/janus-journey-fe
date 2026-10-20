const DetailedWorkspaceSkeleton = () => {
  return (
    <div aria-hidden="true" className="min-h-full bg-white">
      <header className="relative flex min-h-44 flex-col justify-end overflow-hidden bg-slate-800 px-5 py-5">
        <div className="absolute right-4 top-4 size-8 animate-pulse rounded-lg bg-slate-700" />
        <div className="relative animate-pulse">
          <div className="mb-3 size-9 rounded-lg bg-slate-700" />
          <div className="h-7 w-3/4 rounded bg-slate-600" />
          <div className="mt-2 space-y-2">
            <div className="h-3 w-full rounded bg-slate-700" />
            <div className="h-3 w-4/5 rounded bg-slate-700" />
          </div>
        </div>
      </header>

      <nav className="flex items-center gap-5 border-b border-border px-5 pt-4">
        <div className="h-7 w-12 animate-pulse border-b-2 border-primary bg-surface-subtle" />
        <div className="h-7 w-16 animate-pulse bg-surface-subtle" />
        <div className="h-7 w-12 animate-pulse bg-surface-subtle" />
        <div className="h-7 w-10 animate-pulse bg-surface-subtle" />
      </nav>

      <section className="space-y-3 px-5 py-4">
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="flex animate-pulse items-center gap-3 bg-surface-subtle px-3 py-3">
            <div className="size-4 rounded bg-slate-200" />
            <div className="h-4 flex-1 rounded bg-slate-200" />
            <div className="h-3 w-10 rounded bg-slate-200" />
            <div className="size-3 rounded bg-slate-200" />
          </div>
          <div className="animate-pulse">
            <div className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2">
              <div className="size-4 rounded-full bg-surface-subtle" />
              <div className="h-3 flex-1 rounded bg-surface-subtle" />
              <div className="size-3 rounded bg-surface-subtle" />
            </div>
            <div className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2">
              <div className="size-4 rounded-full bg-surface-subtle" />
              <div className="h-3 w-4/5 rounded bg-surface-subtle" />
              <div className="size-3 rounded bg-surface-subtle" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="flex animate-pulse items-center gap-3 bg-surface-subtle px-3 py-3">
            <div className="size-4 rounded bg-slate-200" />
            <div className="h-4 w-3/5 rounded bg-slate-200" />
            <div className="h-3 w-10 rounded bg-slate-200" />
            <div className="size-3 rounded bg-slate-200" />
          </div>
          <div className="animate-pulse">
            <div className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2">
              <div className="size-4 rounded-full bg-surface-subtle" />
              <div className="h-3 flex-1 rounded bg-surface-subtle" />
              <div className="size-3 rounded bg-surface-subtle" />
            </div>
            <div className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2">
              <div className="size-4 rounded-full bg-surface-subtle" />
              <div className="h-3 w-2/3 rounded bg-surface-subtle" />
              <div className="size-3 rounded bg-surface-subtle" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetailedWorkspaceSkeleton
