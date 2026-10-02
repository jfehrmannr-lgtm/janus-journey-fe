import userMock from '@/mock/user.mock.json'
import type { User } from '@/types/resources'

const userData = userMock as User

/**
 * Returns the local mock User through the same asynchronous boundary used by future remote data.
 *
 * @returns A promise containing the mock User.
 */
const getUser = async (): Promise<User> => {
  return userData
}

export { getUser }
