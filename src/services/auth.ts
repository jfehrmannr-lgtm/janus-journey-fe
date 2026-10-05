import { randomUUID } from 'node:crypto'

import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { jwt, type Jwk } from 'better-auth/plugins'

/**
 * Creates the temporary in-memory JWKS adapter used until Better Auth persistence is established.
 *
 * @returns The development JWKS storage adapter.
 */
const createDevelopmentJwksAdapter = () => {
  const keys: Jwk[] = []

  return {
    getJwks: async () => keys,
    createJwk: async (data: Omit<Jwk, 'id'>) => {
      const key = { ...data, id: randomUUID() }
      keys.push(key)
      return key
    }
  }
}

/**
 * Configures Better Auth as the Janus Journey authentication manager.
 *
 * Authentication remains database-free for this phase. JWT signing keys are held
 * in process memory temporarily, while the official Better Auth JWKS endpoint
 * exposes their public keys for development verification.
 */
const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }
  },
  plugins: [
    nextCookies(),
    jwt({
      adapter: createDevelopmentJwksAdapter(),
      jwks: {
        keyPairConfig: { alg: 'RS256' }
      },
      jwt: {
        audience: 'janus-bff',
        definePayload: () => ({}),
        expirationTime: '5 minutes',
        getSubject: ({ user }) => user.id,
        issuer: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'
      }
    })
  ]
})

export { auth }
