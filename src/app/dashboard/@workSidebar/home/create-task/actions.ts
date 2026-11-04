'use server'

import { headers } from 'next/headers'

import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { ApiResponse } from '@/types/api.type'
import type { CreateTaskBulkItem } from '@/types/task-api.type'
import type { ApiTask } from '@/types/resource-api.type'

/**
 * Creates one Task through the Task resource endpoint.
 *
 * @param payload - Single Task resource data sent to the BFF.
 * @returns The created Task returned by the BFF.
 */
export const createTaskAction = async (payload: CreateTaskBulkItem): Promise<ApiResponse<ApiTask>> => {
  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return requestServerBffWithToken<ApiResponse<ApiTask>>('/journeys/tasks', token, {
    body: JSON.stringify(payload),
    method: 'POST'
  })
}
