import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import type { ReactNode } from 'react'

import JanusAuthBoundary from '@/modules/auth/layout/Authentication/JanusAuthBoundary'
import AppLayout from '@/layout/AppLayout/AppLayout'
import { auth } from '@/services/auth'

interface DashboardRouteLayoutProps {
  children: ReactNode
  workSidebar: ReactNode
}

/**
 * Composes Dashboard routes inside the authenticated application shell.
 *
 * @param children - Dashboard route content rendered in the main application area.
 * @returns The shared application layout for Dashboard routes.
 */
const DashboardRouteLayout = async ({ children, workSidebar }: DashboardRouteLayoutProps) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <JanusAuthBoundary>
      <AppLayout workSidebar={workSidebar}>{children}</AppLayout>
    </JanusAuthBoundary>
  )
}

export default DashboardRouteLayout
