'use client'

import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/services/userService'

/**
 * Reads and caches the current Janus User for client components.
 *
 * @returns The React Query result for the mock User.
 */
const useUserQuery = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({ enabled, queryKey: ['user'], queryFn: getUser, retry: false })
}

export default useUserQuery
