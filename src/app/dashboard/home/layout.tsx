import type { ReactNode } from 'react'

import DashboardHomeRoute from '@/components/Dashboard/DashboardHomeRoute'

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
