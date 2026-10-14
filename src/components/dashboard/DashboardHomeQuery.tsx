'use client'

import useDashboardHomeQuery from '@/hooks/useDashboardHomeQuery'
import useNavigationResourcesQuery from '@/hooks/useNavigationResourcesQuery'
import DashboardHome from '@/components/Dashboard/DashboardHome'
import DashboardHomeSkeleton from '@/components/Dashboard/DashboardHomeSkeleton'

/**
 * Loads only the data required by the Dashboard Home workspace.
 *
 * @returns The Dashboard Home query boundary.
 */
const DashboardHomeQuery = () => {
  const dashboardQuery = useDashboardHomeQuery()
  const navigationQuery = useNavigationResourcesQuery()
  const { data, error, isLoading } = dashboardQuery

  if (isLoading || navigationQuery.isLoading) {
    return <DashboardHomeSkeleton />
  }

  if (error || navigationQuery.error || !data || !navigationQuery.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <p className="rounded-xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          Unable to load your Dashboard Home.
        </p>
      </div>
    )
  }

  return <DashboardHome data={data} journeys={navigationQuery.data.journeys} />
}

export default DashboardHomeQuery
