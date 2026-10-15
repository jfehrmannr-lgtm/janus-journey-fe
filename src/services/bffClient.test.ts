import { beforeEach, describe, expect, it, vi } from 'vitest'

const authClientMock = vi.hoisted(() => ({
  token: vi.fn()
}))

vi.mock('./authClient', () => ({ authClient: authClientMock }))

import { BffRequestError, getBffToken, invalidateBffToken } from './bffClient'

const createToken = (expirationSeconds: number): string => {
  const payload = Buffer.from(JSON.stringify({ exp: expirationSeconds })).toString('base64url')

  return `header.${payload}.signature`
}

const createTokenResponse = (token: string) => ({ data: { token }, error: null })

describe('getBffToken', () => {
  beforeEach(() => {
    authClientMock.token.mockReset()
    invalidateBffToken()
    vi.useRealTimers()
  })

  it('caches a valid JWT for subsequent BFF requests', async () => {
    const token = createToken(Math.floor(Date.now() / 1000) + 3600)
    authClientMock.token.mockResolvedValue(createTokenResponse(token))

    await expect(getBffToken()).resolves.toBe(token)
    await expect(getBffToken()).resolves.toBe(token)

    expect(authClientMock.token).toHaveBeenCalledOnce()
  })

  it('shares one token request between concurrent callers', async () => {
    const token = createToken(Math.floor(Date.now() / 1000) + 3600)
    let resolveToken: ((response: ReturnType<typeof createTokenResponse>) => void) | undefined
    const pendingToken = new Promise<ReturnType<typeof createTokenResponse>>((resolve) => {
      resolveToken = resolve
    })
    authClientMock.token.mockReturnValue(pendingToken)

    const firstRequest = getBffToken()
    const secondRequest = getBffToken()

    expect(authClientMock.token).toHaveBeenCalledOnce()
    resolveToken?.(createTokenResponse(token))

    await expect(firstRequest).resolves.toBe(token)
    await expect(secondRequest).resolves.toBe(token)
  })

  it('requests a new JWT inside the expiration safety margin', async () => {
    vi.useFakeTimers()
    const now = new Date('2026-10-15T12:00:00.000Z')
    vi.setSystemTime(now)

    const initialToken = createToken(Math.floor(now.getTime() / 1000) + 60)
    const renewedToken = createToken(Math.floor(now.getTime() / 1000) + 3600)
    authClientMock.token
      .mockResolvedValueOnce(createTokenResponse(initialToken))
      .mockResolvedValueOnce(createTokenResponse(renewedToken))

    await expect(getBffToken()).resolves.toBe(initialToken)
    vi.advanceTimersByTime(31_000)
    await expect(getBffToken()).resolves.toBe(renewedToken)

    expect(authClientMock.token).toHaveBeenCalledTimes(2)
  })

  it('does not cache failed token issuance', async () => {
    const token = createToken(Math.floor(Date.now() / 1000) + 3600)
    authClientMock.token
      .mockResolvedValueOnce({ data: null, error: { message: 'Session expired' } })
      .mockResolvedValueOnce(createTokenResponse(token))

    await expect(getBffToken()).rejects.toMatchObject<Partial<BffRequestError>>({ status: 401 })
    await expect(getBffToken()).resolves.toBe(token)

    expect(authClientMock.token).toHaveBeenCalledTimes(2)
  })

  it('invalidates the cached JWT explicitly', async () => {
    const firstToken = createToken(Math.floor(Date.now() / 1000) + 3600)
    const secondToken = createToken(Math.floor(Date.now() / 1000) + 7200)
    authClientMock.token
      .mockResolvedValueOnce(createTokenResponse(firstToken))
      .mockResolvedValueOnce(createTokenResponse(secondToken))

    await expect(getBffToken()).resolves.toBe(firstToken)
    invalidateBffToken()
    await expect(getBffToken()).resolves.toBe(secondToken)

    expect(authClientMock.token).toHaveBeenCalledTimes(2)
  })

  it('does not repopulate the cache after invalidation during token issuance', async () => {
    const firstToken = createToken(Math.floor(Date.now() / 1000) + 3600)
    const secondToken = createToken(Math.floor(Date.now() / 1000) + 7200)
    let resolveToken: ((response: ReturnType<typeof createTokenResponse>) => void) | undefined
    const pendingToken = new Promise<ReturnType<typeof createTokenResponse>>((resolve) => {
      resolveToken = resolve
    })
    authClientMock.token.mockReturnValueOnce(pendingToken).mockResolvedValueOnce(createTokenResponse(secondToken))

    const firstRequest = getBffToken()
    invalidateBffToken()
    resolveToken?.(createTokenResponse(firstToken))

    await expect(firstRequest).resolves.toBe(firstToken)
    await expect(getBffToken()).resolves.toBe(secondToken)

    expect(authClientMock.token).toHaveBeenCalledTimes(2)
  })
})
