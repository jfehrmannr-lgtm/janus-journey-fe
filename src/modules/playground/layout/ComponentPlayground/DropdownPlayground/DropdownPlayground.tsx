'use client'

import { useState } from 'react'

import Button from '@/components/Button/Button'
import Dropdown from '@/components/Dropdown/Dropdown'
import Icon from '@/components/Icon/Icon'

/**
 * Demonstrates standalone dropdown composition, shared activation, positioning, and close callbacks.
 *
 * @returns The Dropdown component playground.
 */
const DropdownPlayground = () => {
  const [lastClosed, setLastClosed] = useState('None yet')

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border-subtle bg-surface-subtle/60 p-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Behavior</p>
        <h3 className="mt-1 text-xl font-semibold text-text-primary">One active menu at a time</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-body">
          Open either menu, then try Escape or click outside. Opening one menu closes the other through the shared UI
          store.
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <Dropdown
          id="playground-actions"
          trigger={<Button label="Actions" icon={<Icon icon="DownOutlined" />} iconSide="right" />}
          onClose={() => setLastClosed('Actions')}
        >
          <Button
            className="justify-start border-transparent text-text-body hover:bg-surface-subtle"
            icon={<Icon icon="EditOutlined" />}
            label="Edit item"
            onClick={() => setLastClosed('Edit selected')}
            size="full"
            type="button"
            variant="outlined"
          />
          <Button
            className="justify-start border-transparent text-text-body hover:bg-surface-subtle"
            icon={<Icon icon="PlusOutlined" />}
            label="Duplicate item"
            size="full"
            type="button"
            variant="outlined"
          />
        </Dropdown>

        <Dropdown
          id="playground-placement"
          placement="bottom-end"
          trigger={<Button color="neutral" label="Placement" icon={<Icon icon="DownOutlined" />} iconSide="right" />}
          width={200}
        >
          <div className="space-y-1 p-2 text-sm">
            <p className="font-semibold text-text-primary">Bottom end</p>
            <p className="text-text-muted">This menu uses a custom width and placement.</p>
          </div>
        </Dropdown>
      </div>

      <p className="text-sm text-text-muted" role="status">
        Last close callback: <span className="font-semibold text-text-body">{lastClosed}</span>
      </p>
    </div>
  )
}

export default DropdownPlayground
