'use client'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import FolderWorkspace from '@/components/Workspace/FolderWorkspace'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { useQueryClient } from '@tanstack/react-query'

interface CreateFolderViewProps {
  journeyId: string
}

/**
 * Renders the Journey-level Folder creation route navigation.
 *
 * @param journeyId - Journey identifier used to build the return destination.
 * @returns A link back to the current Journey.
 */
const CreateFolderView = ({ journeyId }: CreateFolderViewProps) => {
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
      returnHref={`/dashboard/home/journey/${encodeURIComponent(journeyId)}`}
    />
  )
}

export default CreateFolderView
