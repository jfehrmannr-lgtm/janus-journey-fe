'use server'

import { headers } from 'next/headers'

import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { CreateFolderBulkPayload, CreateFolderBulkResponse } from '@/types/folder-api.type'

export const createFolderAction = async (payload: CreateFolderBulkPayload): Promise<CreateFolderBulkResponse> => {
  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return requestServerBffWithToken<CreateFolderBulkResponse>('/journeys/folders/bulk', token, {
    body: JSON.stringify(payload),
    method: 'POST'
  })
}
