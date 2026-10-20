class ServerBffRequestError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ServerBffRequestError'
    this.status = status
  }
}

/**
 * Sends an authenticated server-side request to the Janus BFF.
 *
 * The token is supplied by the server-side Better Auth integration and is never
 * exposed to the browser or included in dehydrated React Query state.
 *
 * @param path - BFF path beginning with a slash.
 * @param token - Better Auth JWT obtained from the current server request.
 * @param init - Fetch options for the BFF request.
 * @returns The decoded JSON response.
 * @throws ServerBffRequestError when the BFF returns a non-success response.
 */
const requestServerBffWithToken = async <T>(path: string, token: string, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:5000'}${path}`, {
    ...init,
    cache: 'no-store',
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

    throw new ServerBffRequestError(response.status, message)
  }

  return responseBody as T
}

export { requestServerBffWithToken, ServerBffRequestError }
