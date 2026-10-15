'use client'

import { useQuery } from '@tanstack/react-query'

import { getDashboardHomeData } from '@/services/dashboardService'
import type { NavigationRootResources } from '@/types/navigation.type'

/**
 * Reads and caches the data required by the Dashboard Home workspace.
 *
 * @returns The React Query result for Dashboard Home data.
 */
const useDashboardHomeQuery = (resources: NavigationRootResources | undefined) => {
  return useQuery({
    queryKey: ['dashboard', 'home'],
    queryFn: () => {
      if (!resources) {
        throw new Error('Navigation resources are required to build Dashboard Home data.')
      }

      return getDashboardHomeData(resources)
    },
    enabled: Boolean(resources)
  })
}

export default useDashboardHomeQuery
