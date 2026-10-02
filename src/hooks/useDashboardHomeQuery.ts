'use client'

import { useQuery } from '@tanstack/react-query'

import { getDashboardHomeData } from '@/services/dashboardService'

/**
 * Reads and caches the data required by the Dashboard Home workspace.
 *
 * @returns The React Query result for Dashboard Home data.
 */
const useDashboardHomeQuery = () => {
  return useQuery({ queryKey: ['dashboard', 'home'], queryFn: getDashboardHomeData })
}

export default useDashboardHomeQuery
