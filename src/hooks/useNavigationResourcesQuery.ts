'use client'

import { useQuery } from '@tanstack/react-query'

import { getNavigationRootResources } from '@/services/navigationService'

/**
 * Reads and caches root resources required by the authenticated application navigation.
 *
 * @returns The React Query result for root navigation resources.
 */
const useNavigationResourcesQuery = () => {
  return useQuery({ queryKey: ['navigation', 'root-resources'], queryFn: getNavigationRootResources })
}

export default useNavigationResourcesQuery
