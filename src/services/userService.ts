import { getBffToken, getBffTokenSubject, requestBff, requestBffWithToken } from '@/services/bffClient'
import type { CreateUserInput } from '@/types/user-api.type'
import type { User } from '@/types/user.type'

/**
 * Resolves the Janus User addressed by the authenticated Better Auth JWT subject.
 *
 * @returns A promise containing the current Janus User.
 */
const getUser = async (): Promise<User> => {
  const token = await getBffToken()
  const subject = getBffTokenSubject(token)

  return requestBffWithToken<User>(`/users/${encodeURIComponent(subject)}`, token)
}

/**
 * Creates the initial Janus User through the BFF.
 *
 * @param input - Confirmed onboarding profile data.
 * @returns The created Janus User.
 */
const createUser = async (input: CreateUserInput): Promise<User> => {
  return requestBff<User>('/users', {
    body: JSON.stringify(input),
    method: 'POST'
  })
}

export { createUser, getUser }
