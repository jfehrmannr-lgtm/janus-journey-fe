'use server'

import { headers } from 'next/headers'

import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { TaskFormValues } from '@/stores/workspaceFromStore'
import type { TaskState } from '@/types/resource.type'
import type { ApiTask } from '@/types/resource-api.type'

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

export type PatchTaskActionInput =
  | {
      quick?: false
      values: TaskFormValues
    }
  | {
      quick: true
      state: TaskState
    }

/**
 * Partially updates a Task through the authenticated BFF endpoint.
 *
 * @param taskId - Stable identifier of the Task to update.
 * @param input - Complete form values or a quick status update.
 * @returns The updated Task resource.
 * @throws Error when the Task identifier is empty or no authenticated token exists.
 */
export const patchTaskAction = async (taskId: string, input: PatchTaskActionInput): Promise<ApiTask> => {
  if (!taskId.trim()) {
    throw new Error('A Task identifier is required.')
  }

  const payload = input.quick
    ? { state: input.state }
    : {
        description: input.values.description,
        isVisible: input.values.isVisible,
        name: input.values.name,
        state: input.values.state
      }

  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return requestServerBffWithToken<ApiTask>(`/journeys/tasks/${encodeURIComponent(taskId)}`, token, {
    body: JSON.stringify(payload),
    method: 'PATCH'
  })
}
