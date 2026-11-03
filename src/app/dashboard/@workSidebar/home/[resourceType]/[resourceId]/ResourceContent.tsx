import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import DetailedWorkspace from '@/modules/dashboard/layout/ResourceDetail/DetailedWorkspace'
import { auth } from '@/services/auth'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { requestServerBffWithToken, ServerBffRequestError } from '@/services/serverBffClient'
import type { ResourceType } from '@/types/resource.type'

interface ResourceContentProps {
  children: ReactNode
  resourceId: string
  resourceType: ResourceType
}

const ResourceContent = async ({ children, resourceId, resourceType }: ResourceContentProps) => {
  const requestHeaders = await headers()
  const { token } = await auth.api.getToken({ headers: requestHeaders })

  if (!token) redirect('/auth/login')

  const queryClient = new QueryClient()

  let resource: ApiJourneyWithResources

  try {
    resource = await queryClient.query({
      queryKey: navigationQueryKeys.resourceTree(resourceType, resourceId),
      queryFn: async (): Promise<ApiJourneyWithResources> => {
        const result = await requestServerBffWithToken<ApiResponse<ApiJourneyWithResources>>(
          `/journeys/resources/${resourceType}/${encodeURIComponent(resourceId)}`,
          token
        )

        return result.payload
      },
      staleTime: 60_000,
      retry: false
    })
  } catch (error) {
    if (error instanceof ServerBffRequestError && (error.status === 404 || error.status === 400)) {
      return <ResourceNotFound resourceType={resourceType} />
    }

    throw error
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailedWorkspace resource={resource}>{children}</DetailedWorkspace>
    </HydrationBoundary>
  )
}

export default ResourceContent
