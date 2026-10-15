import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import DashboardHomeQuery from '@/components/Dashboard/DashboardHomeQuery'
import { getDashboardHomeData } from '@/services/dashboardService'
import { auth } from '@/services/auth'
import { getNavigationRootResources } from '@/services/navigationService'
import { requestServerBffWithToken } from '@/services/serverBffClient'

/**
 * Composes the Dashboard Home route.
 *
 * @returns The Dashboard Home query boundary.
 */
const DashboardHomePage = async () => {
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

  await Promise.all([
    queryClient.query({
      queryKey: ['dashboard', 'home'],
      queryFn: getDashboardHomeData
    }),
    queryClient.query({
      queryKey: ['navigation', 'root-resources'],
      queryFn: () => getNavigationRootResources((path, init) => requestServerBffWithToken(path, token, init))
    })
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardHomeQuery />
    </HydrationBoundary>
  )
}

export default DashboardHomePage
