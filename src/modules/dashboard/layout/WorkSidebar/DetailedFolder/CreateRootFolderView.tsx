'use client'

import { useQueryClient } from '@tanstack/react-query'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import FolderWorkspace from '@/modules/dashboard/layout/Workspace/FolderWorkspace/FolderWorkspace'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import type { CreateFolderBulkPayload, CreateFolderBulkResponse } from '@/types/folder-api.type'
import type { ApiFolder } from '@/types/resource-api.type'
import type { NavigationRootResources } from '@/types/navigation.type'

interface CreateRootFolderViewProps {
  actions: {
    createFolderAction: (payload: CreateFolderBulkPayload) => Promise<CreateFolderBulkResponse>
  }
}

/**
 * Renders the root Folder creation workspace from hydrated navigation resources.
 *
 * @param actions - Server Actions used to submit the root Folder batch.
 * @returns The root Folder creation workspace or a missing-resource state.
 */
const CreateRootFolderView = ({ actions }: CreateRootFolderViewProps) => {
  const queryClient = useQueryClient()
  const resources = queryClient.getQueryData<NavigationRootResources>(navigationQueryKeys.rootResources())

  if (!resources) {
    return <ResourceNotFound resourceType="folder" />
  }

  return (
    <FolderWorkspace
      actions={actions}
      folders={resources.rootFolders as unknown as ApiFolder[]}
      returnHref="/dashboard/home"
    />
  )
}

export default CreateRootFolderView
