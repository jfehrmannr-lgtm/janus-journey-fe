import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { nextCookies } from 'better-auth/next-js'
import { jwt } from 'better-auth/plugins'

import { betterAuthDb, betterAuthMongoClient } from '@/server/mongodb'

/**
 * Configures Better Auth as the Janus Journey authentication manager.
 *
 * Better Auth owns persistent authentication state and JWT signing keys in the
 * dedicated server-side better-auth-db database.
 */
const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  database: mongodbAdapter(betterAuthDb, { client: betterAuthMongoClient }),
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }
  },
  plugins: [
    jwt({
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
    }),
    nextCookies(),
  ]
})

export { auth }
