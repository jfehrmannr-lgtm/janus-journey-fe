'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import InputCheck from '@/components/InputCheck/InputCheck'
import Input from '@/components/Input/Input'

/**
 * Renders the login form with Better Auth Google sign-in.
 *
 * @returns The login form card content.
 */
const LoginForm = () => {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  /**
   * Starts the Better Auth Google OAuth flow.
   *
   * @returns A promise that resolves after the OAuth request is initiated.
   */
  const handleGoogleSignIn = async () => {
    setErrorMessage(null)
    setIsSigningIn(true)

    try {
      const { authClient } = await import('@/services/authClient')
      const { error } = await authClient.signIn.social({ provider: 'google', callbackURL: '/dashboard/home' })

      if (error) {
        setErrorMessage(error.message ?? 'Google sign-in could not be started.')
        setIsSigningIn(false)
      }
    } catch {
      setErrorMessage('Google sign-in could not be started. Please try again.')
      setIsSigningIn(false)
    }
  }

  /**
   * Keeps the visual email and password controls from submitting an unsupported credential flow.
   *
   * @param event - The form submission event to cancel.
   * @returns Nothing.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form className="mt-8" id="login-form" onSubmit={handleSubmit}>
      <button
        className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
        disabled={isSigningIn}
        onClick={handleGoogleSignIn}
        type="button"
      >
        <span className="text-xl font-bold leading-none text-[#4285f4]">G</span>
        {isSigningIn ? 'Connecting to Google...' : 'Continue with Google'}
      </button>

      <div className="my-6 flex items-center gap-4 text-sm text-slate-400" aria-hidden="true">
        <span className="h-px flex-1 bg-slate-200" />
        <span>or</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {errorMessage && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{errorMessage}</p>}

      <div className="space-y-5">
        <Input autoComplete="email" id="email" label="Email" name="email" placeholder="you@example.com" type="email" />

        <Input
          autoComplete="current-password"
          id="password"
          label="Password"
          name="password"
          placeholder="•••••••••"
          type="password"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <InputCheck id="remember-me" label="Remember me" name="remember-me" />
        <button className="font-medium text-blue-600 hover:text-blue-700" type="button">
          Forgot password?
        </button>
      </div>

      <button
        className="mt-6 h-12 w-full rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/15"
        type="button"
      >
        Sign in
      </button>

      <p className="mt-5 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <button className="font-semibold text-blue-600 hover:text-blue-700" type="button">
          Create one
        </button>
      </p>
    </form>
  )
}

export default LoginForm
