import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import DashboardHomeQuery from '@/modules/dashboard/layout/Dashboard/DashboardHomeQuery'
import { auth } from '@/services/auth'
import { getDashboardHomeData } from '@/services/dashboardService'
import { getNavigationRootResources } from '@/services/navigationService'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { requestServerBffWithToken } from '@/services/serverBffClient'

/**
 * Prefetches authenticated Dashboard Home data and renders its hydrated query boundary.
 *
 * @returns The hydrated Dashboard Home query boundary.
 */
const DashboardHomeRoute = async () => {
  const requestHeaders = await headers()
  const { token } = await auth.api.getToken({ headers: requestHeaders })

  if (!token) {
    redirect('/auth/login')
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false
      }
    }
  })

  const navigationResources = await queryClient.query({
    queryKey: navigationQueryKeys.rootResources(),
    queryFn: () => getNavigationRootResources((path, init) => requestServerBffWithToken(path, token, init))
  })

  queryClient.setQueryData(['dashboard', 'home'], getDashboardHomeData(navigationResources))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardHomeQuery />
    </HydrationBoundary>
  )
}

export default DashboardHomeRoute
