'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useRef, type ReactNode } from 'react'

import CollapseSidenavEffect from '@/components/WorkSidebar/CollapseSidenavEffect'
import { dashboardHomePath, getSelectedResourceFromPathname } from '@/utils/dashboardRoutes'

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
  const pathname = usePathname()
  const router = useRouter()
  const isOpen = getSelectedResourceFromPathname(pathname) !== null
  const lastPathname = useRef<string>(null)

  const handleToggle = () => {
    if (isOpen) {
      lastPathname.current = pathname
      router.push(dashboardHomePath, { scroll: false })
    } else {
      router.push(lastPathname.current || '', { scroll: false })
    }
  }

  return (
    <CollapseSidenavEffect isOpen={isOpen} onToggle={handleToggle}>
      {children}
    </CollapseSidenavEffect>
  )
}

export default CollapseSidenav
