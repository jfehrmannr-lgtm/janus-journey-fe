import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import LoginPage from '@/layout/LoginPage/LoginPage'
import { auth } from '@/services/auth'

/**
 * Composes the Janus Journey login experience for the authentication route.
 *
 * @returns The login page experience.
 */
const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    redirect('/dashboard/home')
  }

  return <LoginPage />
}

export default Page
