import { Suspense } from 'react'
import type { ReactNode } from 'react'

import DashboardHomeRoute from '@/modules/dashboard/layout/Dashboard/DashboardHomeRoute'
import DashboardHomeSkeleton from '@/modules/dashboard/layout/Dashboard/DashboardHomeSkeleton'

interface HomeLayoutProps {
  children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <Suspense fallback={<DashboardHomeSkeleton />}>
        <DashboardHomeRoute />
      </Suspense>
      {children}
    </>
  )
}

export default HomeLayout
