'use client'

import useDashboardHomeQuery from '@/hooks/useDashboardHomeQuery'
import DashboardHome from '@/components/dashboard/DashboardHome'
import DashboardHomeSkeleton from '@/components/dashboard/DashboardHomeSkeleton'

/**
 * Loads only the data required by the Dashboard Home workspace.
 *
 * @returns The Dashboard Home query boundary.
 */
const DashboardHomeQuery = () => {
  const { data, error, isLoading } = useDashboardHomeQuery()

  if (isLoading) {
    return <DashboardHomeSkeleton />
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <p className="rounded-xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          Unable to load your Dashboard Home.
        </p>
      </div>
    )
  }

  return <DashboardHome data={data} />
}

export default DashboardHomeQuery
