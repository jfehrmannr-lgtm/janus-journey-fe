'use server'

import { headers } from 'next/headers'

import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { ApiResponse } from '@/types/api.type'
import type { CreateJourneyPayload } from '@/types/createJourney'
import type { ApiJourney } from '@/types/resource-api.type'

/**
 * Creates one root Journey through the Journey resource endpoint.
 *
 * @param payload - Single Journey resource data sent to the BFF.
 * @returns The created Journey returned by the BFF.
 */
export const createJourneyAction = async (payload: CreateJourneyPayload): Promise<ApiResponse<ApiJourney>> => {
  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return requestServerBffWithToken<ApiResponse<ApiJourney>>('/journeys/journeys', token, {
    body: JSON.stringify(payload),
    method: 'POST'
  })
}
