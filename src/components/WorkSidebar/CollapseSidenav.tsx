'use client'

import type { ReactNode } from 'react'

import CollapseSidenavEffect from '@/components/WorkSidebar/CollapseSidenavEffect'
import useAppUiStore from '@/stores/appUiStore'

interface CollapseSidenavProps {
  children: ReactNode
}

/**
 * Owns the Work Sidebar visibility state while delegating its transition UI.
 *
 * @param children - Content rendered inside the collapsible sidebar.
 * @returns A collapsible Work Sidebar.
 */
const CollapseSidenav = ({ children }: CollapseSidenavProps) => {
  const isOpen = useAppUiStore((state) => state.isWorkSidebarOpen)
  const closeWorkSidebar = useAppUiStore((state) => state.closeWorkSidebar)
  const openWorkSidebar = useAppUiStore((state) => state.openWorkSidebar)

  return (
    <CollapseSidenavEffect isOpen={isOpen} onToggle={isOpen ? closeWorkSidebar : openWorkSidebar}>
      {children}
    </CollapseSidenavEffect>
  )
}

export default CollapseSidenav
