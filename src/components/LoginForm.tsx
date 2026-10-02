'use client'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { FormEvent } from 'react'

interface LoginFormProps {
  onSignIn: () => void
}

/**
 * Renders the visual-only login form.
 *
 * @param onSignIn - Callback invoked when the demo sign-in action is submitted.
 * @returns The login form card content.
 */
const LoginForm = ({ onSignIn }: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  /**
   * Prevents the browser form submission and invokes the visual sign-in callback.
   *
   * @param event - The form submission event to cancel.
   * @returns Nothing.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSignIn()
  }

  return (
    <form className="mt-8" id="login-form" onSubmit={handleSubmit}>
      <button
        className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
        type="button"
      >
        <span className="text-xl font-bold leading-none text-[#4285f4]">G</span>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-4 text-sm text-slate-400" aria-hidden="true">
        <span className="h-px flex-1 bg-slate-200" />
        <span>or</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="space-y-5">
        <label className="block text-sm font-semibold text-slate-800" htmlFor="email">
          Email
          <input
            autoComplete="email"
            className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-normal text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800" htmlFor="password">
          Password
          <span className="relative mt-2 block">
            <input
              autoComplete="current-password"
              className="h-12 w-full rounded-lg border border-slate-200 bg-white px-3.5 pr-11 text-sm font-normal text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              id="password"
              name="password"
              placeholder="•••••••••"
              type={isPasswordVisible ? 'text' : 'password'}
            />
            <button
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition-colors hover:text-slate-700"
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              type="button"
            >
              {isPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </span>
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 text-slate-600" htmlFor="remember-me">
          <input className="size-4 accent-slate-800" id="remember-me" name="remember-me" type="checkbox" />
          Remember me
        </label>
        <button className="font-medium text-blue-600 hover:text-blue-700" type="button">
          Forgot password?
        </button>
      </div>

      <button
        className="mt-6 h-12 w-full rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/15"
        onClick={onSignIn}
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
