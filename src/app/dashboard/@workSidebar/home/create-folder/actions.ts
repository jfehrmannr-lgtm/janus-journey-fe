'use server'

import { headers } from 'next/headers'

import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { ApiResponse } from '@/types/api.type'
import type { CreateFolderBulkItem } from '@/types/folder-api.type'
import type { ApiFolder } from '@/types/resource-api.type'

/**
 * Creates one Folder through the Folder resource endpoint.
 *
 * @param payload - Single Folder resource data sent to the BFF.
 * @returns The created Folder returned by the BFF.
 */
export const createFolderAction = async (payload: CreateFolderBulkItem): Promise<ApiResponse<ApiFolder>> => {
  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return requestServerBffWithToken<ApiResponse<ApiFolder>>('/journeys/folders', token, {
    body: JSON.stringify(payload),
    method: 'POST'
  })
}
