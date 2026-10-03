import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import type { ReactNode } from 'react'

import AppLayout from '@/layout/AppLayout/AppLayout'
import { auth } from '@/services/auth'

interface DashboardRouteLayoutProps {
  children: ReactNode
}

/**
 * Composes Dashboard routes inside the authenticated application shell.
 *
 * @param children - Dashboard route content rendered in the main application area.
 * @returns The shared application layout for Dashboard routes.
 */
const DashboardRouteLayout = async ({ children }: DashboardRouteLayoutProps) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect('/login')
  }

  return <AppLayout>{children}</AppLayout>
}

export default DashboardRouteLayout
