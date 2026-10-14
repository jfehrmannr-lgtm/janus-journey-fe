'use client'

import type { ReactNode } from 'react'

import Icon from '@/components/Icon/Icon'

interface CollapseSidenavEffectProps {
  children: ReactNode
  isOpen: boolean
  onToggle: () => void
}

/**
 * Renders the Work Sidebar surface and its open/close transition.
 *
 * @param children - Content rendered inside the sidebar surface.
 * @param isOpen - Whether the sidebar is currently visible.
 * @param onToggle - Callback used by the collapse control.
 * @returns The animated Work Sidebar surface.
 */
const CollapseSidenavEffect = ({ children, isOpen, onToggle }: CollapseSidenavEffectProps) => {
  return (
    <aside
      aria-label="Work sidebar"
      className={`fixed inset-y-0 right-0 z-40 flex h-screen max-w-[calc(100vw-2.5rem)] flex-col border-l border-slate-200 bg-white transition-[width,transform] duration-300 ease-in-out ${isOpen ? 'w-88' : 'w-0'}`}
    >
      <button
        aria-label={isOpen ? 'Collapse work sidebar' : 'Expand work sidebar'}
        className="absolute -left-10 top-5 z-10 flex size-9 items-center justify-center rounded-l-lg border border-r-0 border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-950"
        onClick={onToggle}
        type="button"
      >
        {isOpen ? <Icon icon="MenuFoldOutlined" /> : <Icon icon="MenuUnfoldOutlined" />}
      </button>
      <div
        className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto transition-[transform,opacity] duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        {children}
      </div>
    </aside>
  )
}

export default CollapseSidenavEffect
