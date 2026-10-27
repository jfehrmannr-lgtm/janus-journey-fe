import ComponentPlayground from '@/modules/playground/layout/ComponentPlayground/ComponentPlayground'

/**
 * Composes the local-only component playground route.
 *
 * @returns The component playground or its environment notice.
 */
const ComponentTestingPage = () => {
  if (process.env.NODE_ENV !== 'development') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-page px-6 text-text-primary">
        <p className="rounded-xl border border-border bg-surface px-6 py-5 text-center text-text-body">
          The component testing page is only available in local development mode.
        </p>
      </main>
    )
  }

  return <ComponentPlayground />
}

export default ComponentTestingPage
