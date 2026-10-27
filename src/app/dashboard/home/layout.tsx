import type { ReactNode } from 'react'

import DashboardHomeRoute from '@/modules/dashboard/layout/Dashboard/DashboardHomeRoute'

interface HomeLayoutProps {
  children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <DashboardHomeRoute />
      {children}
    </>
  )
}

export default HomeLayout
