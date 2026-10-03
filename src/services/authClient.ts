'use client'

import { createAuthClient } from 'better-auth/react'

/**
 * Creates the browser Better Auth client for OAuth and session actions.
 *
 * @returns The Better Auth browser client.
 */
const authClient = createAuthClient()

export { authClient }
