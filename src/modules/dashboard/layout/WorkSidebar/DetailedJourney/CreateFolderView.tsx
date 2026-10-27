'use client'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import FolderWorkspace from '@/modules/dashboard/layout/Workspace/FolderWorkspace/FolderWorkspace'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import type { CreateFolderBulkPayload, CreateFolderBulkResponse } from '@/types/folder-api.type'
import { useQueryClient } from '@tanstack/react-query'

interface CreateFolderViewProps {
  journeyId: string
  actions: {
    createFolderAction: (payload: CreateFolderBulkPayload) => Promise<CreateFolderBulkResponse>
  }
}

/**
 * Renders the Journey-level Folder creation route navigation.
 *
 * @param journeyId - Journey identifier used to build the return destination.
 * @returns A link back to the current Journey.
 */
const CreateFolderView = ({ journeyId, actions }: CreateFolderViewProps) => {
  const queryClient = useQueryClient()
  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )

  if (!journey) {
    return <ResourceNotFound resourceType="journey" />
  }

  return (
    <FolderWorkspace
      folders={journey.folders}
      journeyId={journeyId}
      reference={{ name: journey.name, type: 'journey' }}
      returnHref={`/dashboard/home/journey/${encodeURIComponent(journeyId)}`}
      actions={actions}
    />
  )
}

export default CreateFolderView
