'use server'

import { headers } from 'next/headers'

import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'

/**
 * Deletes selected Folder and Task resources through the existing BFF bulk endpoints.
 *
 * @param journeyId - Journey identifier associated with the selected resources.
 * @param folderIds - Folder identifiers selected for deletion.
 * @param taskIds - Task identifiers selected for deletion.
 * @returns A promise resolved after all requested deletion calls complete.
 * @throws Error when the request is unauthenticated or contains no resource identifiers.
 */
export const bulkDeleteResourcesAction = async (
  journeyId: string,
  folderIds: string[],
  taskIds: string[]
): Promise<void> => {
  if (!journeyId.trim() || (folderIds.length === 0 && taskIds.length === 0)) {
    throw new Error('A Journey and at least one resource are required.')
  }

  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  await Promise.all([
    folderIds.length > 0
      ? requestServerBffWithToken<void>('/journeys/folders/bulk', token, {
          body: JSON.stringify({ ids: folderIds }),
          method: 'DELETE'
        })
      : Promise.resolve(),
    taskIds.length > 0
      ? requestServerBffWithToken<void>('/journeys/tasks/bulk', token, {
          body: JSON.stringify({ ids: taskIds }),
          method: 'DELETE'
        })
      : Promise.resolve()
  ])
}
