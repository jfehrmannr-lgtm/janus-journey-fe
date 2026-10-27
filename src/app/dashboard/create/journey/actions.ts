'use server'

import { headers } from 'next/headers'
import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { CreateJourneyComposePayload } from '@/types/createJourney'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourney } from '@/types/resource-api.type'

export const createJourneyAction = async (payload: CreateJourneyComposePayload): Promise<ApiResponse<ApiJourney>> => {
  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return requestServerBffWithToken('/journeys/journeys/compose', token, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
