import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import DetailedWorkspace from '@/layout/WorkSidebar/DetailedWorkspace'
import { auth } from '@/services/auth'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { requestServerBffWithToken, ServerBffRequestError } from '@/services/serverBffClient'

interface JourneyContentProps {
  children: ReactNode
  journeyId: string
}

const JourneyContent = async ({ children, journeyId }: JourneyContentProps) => {
  const requestHeaders = await headers()
  const { token } = await auth.api.getToken({ headers: requestHeaders })

  if (!token) redirect('/auth/login')

  const queryClient = new QueryClient()

  let journey: ApiJourneyWithResources

  try {
    journey = await queryClient.query({
      queryKey: navigationQueryKeys.resourceTree('journey', journeyId),
      queryFn: async (): Promise<ApiJourneyWithResources> => {
        const result = await requestServerBffWithToken<ApiResponse<ApiJourneyWithResources>>(
          `/journeys/resources/journey/${encodeURIComponent(journeyId)}`,
          token
        )

        return result.payload
      },
      staleTime: 60_000,
      retry: false
    })
  } catch (error) {
    if (error instanceof ServerBffRequestError && (error.status === 404 || error.status === 400)) {
      return <ResourceNotFound resourceType="journey" />
    }

    throw error
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailedWorkspace resource={journey}>{children}</DetailedWorkspace>
    </HydrationBoundary>
  )
}

export default JourneyContent
