'use client'

import { useQuery } from '@tanstack/react-query'

import { getJourneyTree } from '@/services/navigationService'

/**
 * Reads and caches one Journey tree by Journey ID.
 *
 * @param journeyUid - Stable identifier of the Journey to load.
 * @returns The React Query result for the Journey tree.
 */
const useJourneyTreeQuery = (journeyUid: string | null) => {
  return useQuery({
    queryKey: ['navigation', 'journey-tree', journeyUid],
    queryFn: () => {
      if (!journeyUid) {
        throw new Error('A Journey ID is required to load its tree.')
      }

      return getJourneyTree(journeyUid)
    },
    enabled: Boolean(journeyUid)
  })
}

export default useJourneyTreeQuery
