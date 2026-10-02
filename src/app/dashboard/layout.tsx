import type { ReactNode } from 'react'

import AppLayout from '@/layout/AppLayout'

interface DashboardRouteLayoutProps {
  children: ReactNode
}

/**
 * Composes Dashboard routes inside the authenticated application shell.
 *
 * @param children - Dashboard route content rendered in the main application area.
 * @returns The shared application layout for Dashboard routes.
 */
const DashboardRouteLayout = ({ children }: DashboardRouteLayoutProps) => {
  return <AppLayout>{children}</AppLayout>
}

export default DashboardRouteLayout
