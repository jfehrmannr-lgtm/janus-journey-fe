'use client'

import { useState } from 'react'

import { authClient } from '@/services/authClient'

interface BffJwtPayload {
  aud?: string | string[]
  exp?: number
  iat?: number
  iss?: string
  sub?: string
  [claim: string]: unknown
}

/**
 * Decodes the JWT payload for development inspection without retaining the token.
 *
 * @param token - JWT returned by Better Auth.
 * @returns The decoded JWT payload.
 * @throws An error when the value is not a valid JWT payload.
 */
const decodeJwtPayload = (token: string): BffJwtPayload => {
  const encodedPayload = token.split('.')[1]

  if (!encodedPayload) {
    throw new Error('The Better Auth response did not contain a valid JWT.')
  }

  const normalizedPayload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/')
  const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '=')
  const payloadBytes = Uint8Array.from(atob(paddedPayload), (character) => character.charCodeAt(0))

  return JSON.parse(new TextDecoder().decode(payloadBytes)) as BffJwtPayload
}

/**
 * Provides a temporary development control for requesting and inspecting the Better Auth BFF JWT.
 *
 * @returns The JWT inspection panel.
 */
const BffTokenInspector = () => {
  const [payload, setPayload] = useState<BffJwtPayload | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isRequesting, setIsRequesting] = useState(false)

  /**
   * Requests the Better Auth JWT and keeps only its decoded payload in component memory.
   *
   * @returns A promise that resolves after the JWT inspection request completes.
   */
  const handleInspectToken = async () => {
    setErrorMessage(null)
    setIsRequesting(true)

    try {
      const { data, error } = await authClient.token()

      if (error || !data?.token) {
        setPayload(null)
        setErrorMessage(error?.message ?? 'The Better Auth JWT could not be requested.')
        return
      }

      setPayload(decodeJwtPayload(data.token))
    } catch {
      setPayload(null)
      setErrorMessage('The Better Auth JWT could not be decoded.')
    } finally {
      setIsRequesting(false)
    }
  }

  return (
    <section
      className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-100/70 p-5"
      aria-labelledby="bff-token-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Development only</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950" id="bff-token-title">
            Future BFF token
          </h2>
          <p className="mt-1 text-sm text-slate-500">Request the Better Auth JWT and inspect its bounded payload.</p>
        </div>
        <button
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isRequesting}
          onClick={handleInspectToken}
          type="button"
        >
          {isRequesting ? 'Requesting...' : 'Inspect JWT'}
        </button>
      </div>

      {errorMessage && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{errorMessage}</p>}

      {payload && (
        <pre className="mt-4 max-h-64 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-5 text-emerald-300">
          {JSON.stringify(payload, null, 2)}
        </pre>
      )}
    </section>
  )
}

export default BffTokenInspector
