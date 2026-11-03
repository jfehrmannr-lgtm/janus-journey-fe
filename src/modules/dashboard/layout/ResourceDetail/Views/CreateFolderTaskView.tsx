'use client'

import FolderTaskWorkspace from '@/modules/dashboard/layout/ResourceDetail/Workspace/FolderTaskWorkspace/FolderTaskWorkspace'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { useQueryClient } from '@tanstack/react-query'
import type { ApiFolderWithTasks, ApiJourneyWithResources } from '@/types/resource-api.type'
import type { CreateTaskBulkPayload, CreateTaskBulkResponse } from '@/types/task-api.type'

interface CreateFolderTaskViewProps {
  folderId: string
  journeyId?: string
  resourceType?: 'journey' | 'folder'
  returnHref?: string
  actions: {
    createFolderTaskAction: (payload: CreateTaskBulkPayload) => Promise<CreateTaskBulkResponse>
  }
}

/**
 * Composes the contextual Folder Create Task view from hydrated Journey data.
 *
 * @param folderId - Folder identifier from the current route.
 * @param journeyId - Journey identifier used to locate the hydrated Folder.
 * @param actions - Actions to be passed to the FolderTaskWorkspace for task creation.
 * @returns The action bar, Folder card, local form, and existing tasks.
 */
const CreateFolderTaskView = ({
  folderId,
  journeyId,
  resourceType = 'journey',
  returnHref,
  actions
}: CreateFolderTaskViewProps) => {
  const queryClient = useQueryClient()
  const journey = journeyId
    ? queryClient.getQueryData<ApiJourneyWithResources>(navigationQueryKeys.resourceTree('journey', journeyId))
    : undefined
  const folder =
    resourceType === 'folder'
      ? queryClient.getQueryData<ApiFolderWithTasks>(navigationQueryKeys.resourceTree('folder', folderId))
      : journey?.folders.find((currentFolder) => currentFolder.uid === folderId)
  if (!folder) {
    return <ResourceNotFound resourceType="folder" />
  }

  return (
    <FolderTaskWorkspace
      actions={actions}
      folder={folder}
      journeyId={journeyId}
      resourceType={resourceType}
      returnHref={returnHref ?? `/dashboard/home/${resourceType}/${encodeURIComponent(journeyId ?? '')}`}
    />
  )
}

export default CreateFolderTaskView
