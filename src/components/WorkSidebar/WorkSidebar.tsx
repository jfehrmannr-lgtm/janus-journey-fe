'use client'

import type { ReactNode } from 'react'

import CollapseSidenav from '@/components/WorkSidebar/CollapseSidenav'

interface WorkSidebarProps {
  children: ReactNode
}

/**
 * Provides a reusable client-side Work Sidebar shell for any application section.
 *
 * @param children - Arbitrary content composed inside the sidebar.
 * @returns The reusable collapsible Work Sidebar.
 */
const WorkSidebar = ({ children }: WorkSidebarProps) => {
  return <CollapseSidenav>{children}</CollapseSidenav>
}

export default WorkSidebar
