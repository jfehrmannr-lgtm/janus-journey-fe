'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

import CollapseSidenavEffect from '@/components/WorkSidebar/CollapseSidenavEffect'

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
  const [isOpen, setIsOpen] = useState(true)

  return (
    <CollapseSidenavEffect isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)}>
      {children}
    </CollapseSidenavEffect>
  )
}

export default CollapseSidenav
