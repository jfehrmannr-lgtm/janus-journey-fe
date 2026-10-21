'use client'

import FolderTaskWorkspace from '@/components/Workspace/FolderTaskWorkspace'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { useQueryClient } from '@tanstack/react-query'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'

interface CreateFolderTaskViewProps {
  folderId: string
  journeyId: string
}

/**
 * Composes the contextual Folder Create Task view from hydrated Journey data.
 *
 * @param folderId - Folder identifier from the current route.
 * @param journeyId - Journey identifier used to locate the hydrated Folder.
 * @returns The action bar, Folder card, local form, and existing tasks.
 */
const CreateFolderTaskView = ({ folderId, journeyId }: CreateFolderTaskViewProps) => {
  const queryClient = useQueryClient()
  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )
  const folder = journey?.folders.find((currentFolder) => currentFolder.uid === folderId)
  if (!folder) {
    return <ResourceNotFound resourceType="folder" />
  }

  return <FolderTaskWorkspace folder={folder} returnHref={`/dashboard/home/journey/${encodeURIComponent(journeyId)}`} />
}

export default CreateFolderTaskView
