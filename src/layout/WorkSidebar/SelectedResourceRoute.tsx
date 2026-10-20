import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import SelectedResourceContent from '@/layout/WorkSidebar/SelectedResourceContent'
import { auth } from '@/services/auth'
import { getResourceTree } from '@/services/navigationService'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { requestServerBffWithToken, ServerBffRequestError } from '@/services/serverBffClient'

interface SelectedResourceRouteProps {
  resourceId: string
  resourceType: 'journey' | 'folder'
}

/**
 * Prefetches one selected resource tree for the contextual WorkSidebar.
 *
 * @param resourceId - Stable identifier from the dynamic route.
 * @param resourceType - Selected Journey or Folder route type.
 * @returns The hydrated selected-resource content.
 */
const SelectedResourceRoute = async ({ resourceId, resourceType }: SelectedResourceRouteProps) => {
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

  try {
    await queryClient.query({
      queryKey: navigationQueryKeys.resourceTree(resourceType, resourceId),
      queryFn: () =>
        getResourceTree((path, init) => requestServerBffWithToken(path, token, init), resourceType, resourceId)
    })
  } catch (error) {
    if (error instanceof ServerBffRequestError && error.status === 404) {
      return <ResourceNotFound resourceType={resourceType} />
    }

    throw error
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SelectedResourceContent resourceId={resourceId} resourceType={resourceType} />
    </HydrationBoundary>
  )
}

export default SelectedResourceRoute
