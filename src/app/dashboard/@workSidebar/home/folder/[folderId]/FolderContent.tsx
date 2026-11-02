import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import DetailedWorkspace from '@/modules/dashboard/layout/WorkSidebar/DetailedWorkspace'
import { auth } from '@/services/auth'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { requestServerBffWithToken, ServerBffRequestError } from '@/services/serverBffClient'
import type { ApiResponse } from '@/types/api.type'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'

interface FolderContentProps {
  children: ReactNode
  folderId: string
}

/**
 * Loads the selected Folder and composes its hydrated shared workspace.
 *
 * @param children - Folder route content rendered inside the workspace.
 * @param folderId - Selected Folder identifier.
 * @returns A hydrated Folder workspace or a not-found state.
 */
const FolderContent = async ({ children, folderId }: FolderContentProps) => {
  const requestHeaders = await headers()
  const { token } = await auth.api.getToken({ headers: requestHeaders })

  if (!token) redirect('/auth/login')

  const queryClient = new QueryClient()
  const folderQueryKey = navigationQueryKeys.resourceTree('folder', folderId)
  let folder: ApiFolderWithTasks

  try {
    folder = await queryClient.query({
      queryKey: folderQueryKey,
      queryFn: async (): Promise<ApiFolderWithTasks> => {
        const result = await requestServerBffWithToken<ApiResponse<ApiFolderWithTasks>>(
          `/journeys/resources/folder/${encodeURIComponent(folderId)}`,
          token
        )

        return result.payload
      },
      retry: false,
      staleTime: 60_000
    })
  } catch (error) {
    if (error instanceof ServerBffRequestError && (error.status === 404 || error.status === 400)) {
      return <ResourceNotFound resourceType="folder" />
    }

    throw error
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailedWorkspace resource={folder}>{children}</DetailedWorkspace>
    </HydrationBoundary>
  )
}

export default FolderContent
