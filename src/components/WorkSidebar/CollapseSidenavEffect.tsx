'use client'

import { useState } from 'react'
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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const sidebarWidthClass = !isOpen
    ? 'w-0 max-w-[calc(100vw-2.5rem)]'
    : isFullscreen
      ? 'w-screen max-w-none px-8'
      : 'w-140 max-w-[calc(100vw-2.5rem)]'

  return (
    <aside
      aria-label="Work sidebar"
      className={`fixed inset-y-0 right-0 z-60 flex h-screen flex-col border-l border-border bg-surface transition-[width,transform] ease-in-out ${sidebarWidthClass}`}
      style={{ transitionDelay: isOpen ? '0ms' : '0ms' }}
    >
      <button
        aria-label={isOpen ? 'Collapse work sidebar' : 'Expand work sidebar'}
        className="absolute -left-9 top-5 z-10 flex size-9 items-center justify-center rounded-l-lg border border-r-0 border-border bg-surface text-text-muted shadow-sm transition-colors hover:bg-surface-subtle hover:text-text-primary"
        onClick={onToggle}
        type="button"
      >
        {isOpen ? <Icon icon="MenuFoldOutlined" /> : <Icon icon="MenuUnfoldOutlined" />}
      </button>
      {isOpen && (
        <button
          aria-label={isFullscreen ? 'Restore work sidebar width' : 'Expand work sidebar to fullscreen'}
          className="absolute right-4 top-30 z-10 flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted shadow-sm transition-colors hover:bg-surface-subtle hover:text-text-primary"
          onClick={() => setIsFullscreen((currentIsFullscreen) => !currentIsFullscreen)}
          type="button"
        >
          <Icon icon={isFullscreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'} />
        </button>
      )}
      <div
        className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto transition-[transform,opacity] duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}
      >
        {children}
      </div>
    </aside>
  )
}

export default CollapseSidenavEffect
