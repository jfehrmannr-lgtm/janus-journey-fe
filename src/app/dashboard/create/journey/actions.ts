'use server'

import { headers } from 'next/headers'
import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import type { CreateJourneyPayload } from '@/types/createJourney'
import { ApiResponse } from '@/types/api.type'
import { Journey } from '@/types/resource.type'

export const createJourneyAction = async (payload: CreateJourneyPayload): Promise<ApiResponse<Journey>> => {
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
