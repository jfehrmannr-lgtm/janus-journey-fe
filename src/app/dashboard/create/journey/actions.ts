'use server'

import { headers } from 'next/headers'
import { auth } from '@/services/auth'
import { requestServerBffWithToken } from '@/services/serverBffClient'
import { CreateJourneyPayload } from '@/types/createJourney'

export const createJourneyAction = async (payload: CreateJourneyPayload) => {
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
