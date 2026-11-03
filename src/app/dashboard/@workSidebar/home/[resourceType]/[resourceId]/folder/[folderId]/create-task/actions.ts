'use server'

import { headers } from 'next/headers'

import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { CreateTaskBulkPayload, CreateTaskBulkResponse } from '@/types/task-api.type'

export const createFolderTaskAction = async (payload: CreateTaskBulkPayload): Promise<CreateTaskBulkResponse> => {
  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return requestServerBffWithToken<CreateTaskBulkResponse>('/journeys/tasks/bulk', token, {
    body: JSON.stringify(payload),
    method: 'POST'
  })
}
