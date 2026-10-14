import type { ReactNode } from 'react'

import WorkSidebar from '@/components/WorkSidebar/WorkSidebar'
import SideNavQuery from '@/layout/SideNav/SideNavQuery'
import SelectedResourceContent from '@/layout/WorkSidebar/SelectedResourceContent'

interface AppLayoutProps {
  children: ReactNode
}

/**
 * Renders the persistent authenticated application shell.
 *
 * @param children - Content rendered in the main application area.
 * @returns The application shell with persistent navigation.
 */
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-surface-page lg:flex-row">
      <SideNavQuery />
      <main className="min-w-0 flex-1">{children}</main>
      <WorkSidebar>
        <SelectedResourceContent />
      </WorkSidebar>
    </div>
  )
}

export default AppLayout
