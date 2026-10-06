'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { authClient } from '@/services/authClient'
import { BffRequestError } from '@/services/bffClient'
import { createUser } from '@/services/userService'
import useJanusAuthStore from '@/stores/janusAuthStore'
import type { User } from '@/types/resources'
import { useQueryClient } from '@tanstack/react-query'

interface BetterAuthAccount {
  accountId: string
  providerId: string
}

/**
 * Renders the first-time User provisioning flow after an authenticated User
 * lookup returned 404.
 *
 * @returns The User provisioning screen.
 */
const CreateUserScreen = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const setAuthState = useJanusAuthStore((state) => state.setState)
  const sessionResult = authClient.useSession()
  const [accounts, setAccounts] = useState<BetterAuthAccount[]>([])
  const [accountError, setAccountError] = useState<string | null>(null)
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [username, setUsername] = useState<string | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [conflictMessage, setConflictMessage] = useState<string | null>(null)
  const sessionUser = sessionResult.data?.user

  useEffect(() => {
    if (!sessionResult.data) {
      return
    }

    let isCancelled = false

    const loadAccounts = async () => {
      const { data, error } = await authClient.listAccounts()

      if (isCancelled) {
        return
      }

      if (error || !data) {
        setAccountError(error?.message ?? 'The Google authentication identity could not be resolved.')
        setIsLoadingAccounts(false)
        return
      }

      setAccounts(data as BetterAuthAccount[])
      setIsLoadingAccounts(false)
    }

    void loadAccounts()

    return () => {
      isCancelled = true
    }
  }, [sessionResult.data])

  const handleCreate = async () => {
    setErrorMessage(null)
    setConflictMessage(null)

    const confirmedUsername = username?.trim() ?? sessionUser?.name?.trim() ?? ''

    if (!sessionUser?.email || confirmedUsername === '') {
      setErrorMessage('A valid email and username are required.')
      return
    }

    const googleAccount = accounts.find((account) => account.providerId === 'google')

    if (!googleAccount) {
      setErrorMessage('The Google authentication identity could not be resolved.')
      return
    }

    setIsCreating(true)

    try {
      const createdUser = await createUser({
        authLogins: [
          {
            authLogin: `oauth-google-${googleAccount.accountId}`,
            metadata: {},
            provider: 'google',
            providerAvatarUrl: sessionUser.image ?? null,
            providerEmail: sessionUser.email,
            providerUsername: sessionUser.name ?? null
          }
        ],
        config: {
          avatarUrl: sessionUser.image ?? null,
          username: confirmedUsername
        },
        email: sessionUser.email
      })

      queryClient.setQueryData<User>(['user'], createdUser)
      setAuthState({ isAuthenticated: true, isError: false, isLoading: false, isProvisioning: false })
      router.replace('/dashboard/home')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof BffRequestError && error.status === 409) {
        setConflictMessage(error.message)
        setAuthState({ isAuthenticated: false, isError: false, isLoading: false, isProvisioning: true })
      } else if (error instanceof BffRequestError && error.status >= 400 && error.status < 500) {
        setErrorMessage(error.message)
        setAuthState({ isAuthenticated: false, isError: false, isLoading: false, isProvisioning: true })
      } else {
        setErrorMessage(error instanceof Error ? error.message : 'The Janus User could not be created.')
        setAuthState({ isAuthenticated: false, isError: true, isLoading: false, isProvisioning: false })
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Create your Janus account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your Google account is connected. Confirm the information Janus will use for your account.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
            <p className="mt-1 text-sm text-slate-800">{sessionUser?.email ?? 'Unavailable'}</p>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="janus-username">
            Username
            <input
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              id="janus-username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder={sessionUser?.name ?? 'Choose a username'}
              value={username ?? ''}
            />
          </label>
        </div>

        <label className="mt-6 flex items-start gap-3 text-sm text-slate-600" htmlFor="janus-account-confirmation">
          <input
            checked={isConfirmed}
            className="mt-1 size-4 accent-slate-900"
            id="janus-account-confirmation"
            onChange={(event) => setIsConfirmed(event.target.checked)}
            type="checkbox"
          />
          <span>
            I confirm that I am creating a Janus account and allow Janus to use this account information according to
            its policy.
          </span>
        </label>

        {(accountError || errorMessage || conflictMessage) && (
          <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
            {conflictMessage ?? accountError ?? errorMessage}
          </p>
        )}

        <button
          className="mt-6 h-11 w-full rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isConfirmed || !sessionUser || isLoadingAccounts || isCreating}
          onClick={handleCreate}
          type="button"
        >
          {isCreating ? 'Creating account...' : 'Confirm and create account'}
        </button>
      </section>
    </main>
  )
}

export default CreateUserScreen
