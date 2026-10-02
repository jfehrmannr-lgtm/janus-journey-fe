import type { ReactNode } from 'react'

import SideNavQuery from '@/layout/SideNav/SideNavQuery'

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
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <SideNavQuery />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}

export default AppLayout
