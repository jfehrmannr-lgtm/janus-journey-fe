'use client'

import { useState } from 'react'

import { PLAYGROUND_REGISTRY } from './playgroundRegistry'

/**
 * Renders the shared component playground shell and registered playground navigation.
 *
 * @returns The component playground with the selected component preview.
 */
const ComponentPlayground = () => {
  const [selectedId, setSelectedId] = useState(PLAYGROUND_REGISTRY[0]?.id ?? '')
  const selectedPlayground = PLAYGROUND_REGISTRY.find((item) => item.id === selectedId) ?? PLAYGROUND_REGISTRY[0]

  if (!selectedPlayground) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-page px-6 text-text-primary">
        <p className="rounded-xl border border-border bg-surface px-6 py-5 text-center text-text-body">
          No component playgrounds are registered yet.
        </p>
      </main>
    )
  }

  const SelectedPlayground = selectedPlayground.playground

  return (
    <main className="min-h-screen bg-surface-page px-4 py-6 text-text-primary sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Development tools</p>
          <h1 className="text-4xl font-semibold tracking-tight">Component playground</h1>
          <p className="max-w-3xl text-text-body">
            Review reusable Janus Journey components before integrating them into the application.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-xl border border-border bg-surface p-3 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-text-subtle">Components</p>
            <nav aria-label="Component playgrounds" className="space-y-1">
              {PLAYGROUND_REGISTRY.map((item) => {
                const isSelected = item.id === selectedPlayground.id

                return (
                  <button
                    aria-current={isSelected ? 'page' : undefined}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-focus/20 ${isSelected ? 'bg-primary-soft text-primary-foreground' : 'text-text-body hover:bg-surface-subtle hover:text-text-primary'}`}
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    type="button"
                  >
                    {item.name}
                  </button>
                )
              })}
            </nav>
          </aside>

          <section
            className="min-w-0 rounded-xl border border-border bg-surface p-5 sm:p-7"
            aria-labelledby="selected-playground-title"
          >
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-border-subtle pb-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Selected component</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight" id="selected-playground-title">
                  {selectedPlayground.name}
                </h2>
              </div>
              <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-muted">
                Playground
              </span>
            </div>
            <SelectedPlayground />
          </section>
        </div>
      </div>
    </main>
  )
}

export default ComponentPlayground
