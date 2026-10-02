'use client'

import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/services/userService'

/**
 * Reads and caches the current mock User for client components.
 *
 * @returns The React Query result for the mock User.
 */
const useUserQuery = () => {
  return useQuery({ queryKey: ['user'], queryFn: getUser })
}

export default useUserQuery
