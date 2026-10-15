'use client'

import { authClient } from './authClient'

export class BffRequestError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'BffRequestError'
    this.status = status
  }
}

const BFF_TOKEN_EXPIRATION_SAFETY_MARGIN_MS = 30_000

interface CachedBffToken {
  token: string
  expiresAt: number
}

let cachedBffToken: CachedBffToken | null = null
let inFlightBffTokenRequest: Promise<string> | null = null
let bffTokenGeneration = 0

const getTokenExpiration = (token: string): number | null => {
  const payload = token.split('.')[1]

  if (!payload) {
    return null
  }

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      '='
    )
    const decodedPayload = JSON.parse(atob(paddedPayload)) as unknown

    if (
      typeof decodedPayload !== 'object' ||
      decodedPayload === null ||
      !('exp' in decodedPayload) ||
      typeof decodedPayload.exp !== 'number' ||
      !Number.isFinite(decodedPayload.exp)
    ) {
      return null
    }

    return decodedPayload.exp * 1000
  } catch {
    return null
  }
}

/**
 * Invalidates the in-memory BFF JWT and any cache population from an older session.
 *
 * @returns Nothing.
 */
const invalidateBffToken = (): void => {
  cachedBffToken = null
  bffTokenGeneration += 1
  inFlightBffTokenRequest = null
}

/**
 * Obtains the Better Auth JWT used for authenticated BFF requests.
 *
 * @returns The authenticated BFF JWT.
 * @throws BffRequestError when Better Auth cannot provide a token.
 */
const getBffToken = async (): Promise<string> => {
  const now = Date.now()

  if (cachedBffToken && cachedBffToken.expiresAt - BFF_TOKEN_EXPIRATION_SAFETY_MARGIN_MS > now) {
    return cachedBffToken.token
  }

  if (inFlightBffTokenRequest) {
    return inFlightBffTokenRequest
  }

  const requestGeneration = bffTokenGeneration
  const tokenRequest = authClient
    .token()
    .then(({ data, error }) => {
      if (error || !data?.token) {
        throw new BffRequestError(401, error?.message ?? 'The Better Auth access token was unavailable.')
      }

      const expiresAt = getTokenExpiration(data.token)

      if (
        requestGeneration === bffTokenGeneration &&
        expiresAt !== null &&
        expiresAt - BFF_TOKEN_EXPIRATION_SAFETY_MARGIN_MS > Date.now()
      ) {
        cachedBffToken = { token: data.token, expiresAt }
      }

      return data.token
    })
    .finally(() => {
      if (inFlightBffTokenRequest === tokenRequest) {
        inFlightBffTokenRequest = null
      }
    })

  inFlightBffTokenRequest = tokenRequest

  return tokenRequest
}

/**
 * Reads the authenticated subject from a Better Auth JWT payload.
 *
 * The BFF remains authoritative and validates the JWT signature and claims. The
 * frontend only reads `sub` to address the existing User resource endpoint.
 *
 * @param token - The Better Auth JWT.
 * @returns The JWT subject.
 * @throws BffRequestError when the token does not contain a usable subject.
 */
const getBffTokenSubject = (token: string): string => {
  const payload = token.split('.')[1]

  if (!payload) {
    throw new BffRequestError(401, 'The Better Auth access token had no subject.')
  }

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      '='
    )
    const decodedPayload = JSON.parse(atob(paddedPayload)) as unknown

    if (
      typeof decodedPayload !== 'object' ||
      decodedPayload === null ||
      !('sub' in decodedPayload) ||
      typeof decodedPayload.sub !== 'string' ||
      decodedPayload.sub.trim() === ''
    ) {
      throw new Error('Missing subject')
    }

    return decodedPayload.sub
  } catch {
    throw new BffRequestError(401, 'The Better Auth access token had no usable subject.')
  }
}

/**
 * Sends an authenticated browser request to the Janus BFF.
 *
 * @param path - BFF path beginning with a slash.
 * @param init - Fetch options for the BFF request.
 * @returns The decoded JSON response.
 * @throws BffRequestError when the BFF returns a non-success response.
 */
const requestBff = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const token = await getBffToken()

  return requestBffWithToken<T>(path, token, init)
}

/**
 * Sends an authenticated request with an already obtained JWT.
 *
 * @param path - BFF path beginning with a slash.
 * @param token - Better Auth JWT to send to the BFF.
 * @param init - Fetch options for the BFF request.
 * @returns The decoded JSON response.
 * @throws BffRequestError when the BFF returns a non-success response.
 */
const requestBffWithToken = async <T>(path: string, token: string, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:5000'}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...init.headers
    }
  })

  const contentType = response.headers.get('content-type') ?? ''
  const responseBody = contentType.includes('application/json') ? await response.json() : undefined

  if (!response.ok) {
    const message =
      typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody
        ? String(responseBody.message)
        : `The BFF request failed with status ${response.status}.`

    throw new BffRequestError(response.status, message)
  }

  return responseBody as T
}

export { getBffToken, getBffTokenSubject, invalidateBffToken, requestBff, requestBffWithToken }
