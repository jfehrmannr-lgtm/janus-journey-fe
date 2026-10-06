import { getSessionCookie } from 'better-auth/cookies'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Performs an optimistic redirect for unauthenticated Dashboard requests.
 *
 * @param request - Incoming request evaluated by the Next.js Proxy.
 * @returns A redirect to the authentication route or the next response in the request chain.
 */
const proxy = (request: NextRequest) => {
  const hasSessionCookie = Boolean(getSessionCookie(request))

  if (request.nextUrl.pathname.startsWith('/dashboard') && !hasSessionCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}

export default proxy
