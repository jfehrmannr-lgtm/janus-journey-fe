'use client'

import { useState } from 'react'

import Button from '@/components/Button/Button'
import Dropdown from '@/components/Dropdown/Dropdown'
import Icon from '@/components/Icon/Icon'

/**
 * Presents interactive Dropdown placements, sizing, content, and dismissal behavior.
 *
 * @returns The Dropdown playground.
 */
const DropdownPlayground = () => {
  const [lastAction, setLastAction] = useState('No dropdown action selected.')

  return (
    <div className="space-y-10">
      <p className="max-w-3xl text-text-body">
        Test portal positioning, viewport boundary handling, custom content, keyboard dismissal, and programmatic close.
      </p>

      <section className="space-y-4" aria-labelledby="dropdown-placements-title">
        <h3 className="text-2xl font-semibold" id="dropdown-placements-title">
          Placements and triggers
        </h3>
        <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-surface-page p-5">
          {(['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const).map((placement) => (
            <Dropdown
              content={
                <div className="space-y-1">
                  <p className="px-3 py-2 text-sm font-semibold text-text-primary">{placement}</p>
                  <button
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-subtle"
                    type="button"
                  >
                    Example action
                  </button>
                </div>
              }
              key={placement}
              placement={placement}
              trigger={<Button label={placement} variant="outlined" />}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="dropdown-content-title">
        <h3 className="text-2xl font-semibold" id="dropdown-content-title">
          Width, content, and programmatic close
        </h3>
        <div className="grid gap-4 rounded-xl border border-border bg-surface-page p-5 sm:grid-cols-2">
          <Dropdown
            content={(close) => (
              <div className="space-y-3 p-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <Icon icon="CheckCircleOutlined" />
                  Choose an action
                </div>
                <button
                  className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white"
                  onClick={() => {
                    setLastAction('Action selected and dropdown closed.')
                    close()
                  }}
                  type="button"
                >
                  Select and close
                </button>
              </div>
            )}
            maxHeight={180}
            trigger={<Button icon={<Icon icon="EllipsisOutlined" />} label="Programmatic close" />}
            width={280}
          />
          <Dropdown
            content={
              <div className="space-y-2 p-2 text-sm text-text-body">
                <p className="font-semibold text-text-primary">Custom ReactNode content</p>
                <p>This panel accepts arbitrary JSX, including lists, forms, and actions.</p>
              </div>
            }
            maxHeight={120}
            trigger={<Button icon={<Icon icon="AppstoreOutlined" />} label="Custom content" variant="outlined" />}
            width={320}
          />
        </div>
        <p className="rounded-lg border border-border bg-surface-page px-4 py-3 text-sm text-text-body" role="status">
          {lastAction}
        </p>
      </section>

      <section className="flex min-h-80 items-end justify-between gap-4 rounded-xl border border-border bg-surface-page p-5">
        <Dropdown
          content={<div className="p-3 text-sm text-text-body">The panel flips above when space is limited.</div>}
          placement="bottom-start"
          trigger={<Button icon={<Icon icon="DownOutlined" />} label="Near bottom" variant="outlined" />}
        />
        <Dropdown
          content={<div className="p-3 text-sm text-text-body">The panel stays inside the right viewport edge.</div>}
          placement="bottom-end"
          trigger={<Button icon={<Icon icon="RightOutlined" />} label="Near right edge" variant="outlined" />}
        />
      </section>
    </div>
  )
}

export default DropdownPlayground
