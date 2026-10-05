'use client'

import { createAuthClient } from 'better-auth/react'
import { jwtClient } from 'better-auth/client/plugins'

/**
 * Creates the browser Better Auth client for OAuth and session actions.
 *
 * @returns The Better Auth browser client.
 */
const authClient = createAuthClient({ plugins: [jwtClient()] })

export { authClient }
