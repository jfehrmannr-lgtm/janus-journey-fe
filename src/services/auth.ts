import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'

/**
 * Configures Better Auth as the Janus Journey authentication manager.
 *
 * Authentication is intentionally stateless for this phase. No database adapter,
 * JWT plugin, JWKS endpoint, or custom access-token issuer is configured.
 */
const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }
  },
  plugins: [nextCookies()]
})

export { auth }
