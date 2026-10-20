import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import DetailedWorkspace from '@/layout/WorkSidebar/DetailedWorkspace'
import { auth } from '@/services/auth'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'

interface JourneyContentProps {
  children: ReactNode
  journeyId: string
}

const JourneyContent = async ({ children, journeyId }: JourneyContentProps) => {
  const requestHeaders = await headers()
  const { token } = await auth.api.getToken({ headers: requestHeaders })

  if (!token) redirect('/auth/login')

  const queryClient = new QueryClient()

  const journey = await queryClient.query({
    queryKey: navigationQueryKeys.resourceTree('journey', journeyId),
    queryFn: async (): Promise<ApiJourneyWithResources> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BFF_URL}/journeys/resources/journey/${encodeURIComponent(journeyId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store'
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch Journey: ${response.status}`)
      }

      const result: ApiResponse<ApiJourneyWithResources> = await response.json()

      return result.payload
    },
    staleTime: 60_000
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailedWorkspace resource={journey}>{children}</DetailedWorkspace>
    </HydrationBoundary>
  )
}

export default JourneyContent
