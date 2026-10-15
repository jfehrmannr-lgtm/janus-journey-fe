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
  const navigationQuery = useNavigationResourcesQuery()
  const dashboardQuery = useDashboardHomeQuery(navigationQuery.data)
  const { data, error, isLoading } = dashboardQuery

  if (isLoading || navigationQuery.isLoading) {
    return <DashboardHomeSkeleton />
  }

  if (error || navigationQuery.error || !data || !navigationQuery.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-page px-6">
        <p className="rounded-xl border border-danger-border bg-danger-surface px-5 py-4 text-sm text-danger-foreground">
          Unable to load your Dashboard Home.
        </p>
      </div>
    )
  }

  return <DashboardHome resources={navigationQuery.data} />
}

export default DashboardHomeQuery
