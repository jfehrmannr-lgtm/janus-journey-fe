'use client'

import { useQuery } from '@tanstack/react-query'

import { requestBff } from '@/services/bffClient'
import { getResourceTree } from '@/services/navigationService'
import type { ResourceType } from '@/types/resources'

/**
 * Reads and caches one Journey tree by Journey ID.
 *
 * @param resourceType - Type of the selected resource.
 * @param resourceId - Stable identifier of the selected resource.
 * @returns The React Query result for the selected resource tree.
 */
const useJourneyTreeQuery = (resourceType: ResourceType | null, resourceId: string | null) => {
  return useQuery({
    queryKey: ['navigation', 'resource-tree', resourceType, resourceId],
    queryFn: () => {
      if (!resourceType || !resourceId) {
        throw new Error('A resource type and ID are required to load its tree.')
      }

      return getResourceTree(requestBff, resourceType, resourceId)
    },
    enabled: (resourceType === 'journey' || resourceType === 'folder') && Boolean(resourceId)
  })
}

export default useJourneyTreeQuery
