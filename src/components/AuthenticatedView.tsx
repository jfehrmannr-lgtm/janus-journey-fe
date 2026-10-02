import { CheckOutlined, LogoutOutlined } from '@ant-design/icons'

import BrandLogo from '@/components/BrandLogo'

interface AuthenticatedViewProps {
  onLogout: () => void
}

/**
 * Renders the temporary signed-in state for the login demo.
 *
 * @param onLogout - Callback that returns the demo to the login view.
 * @returns The basic authenticated demo view.
 */
const AuthenticatedView = ({ onLogout }: AuthenticatedViewProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white px-6 py-10 text-center shadow-2xl sm:px-12">
        <div className="flex justify-center">
          <BrandLogo />
        </div>
        <div className="mx-auto mt-12 flex size-16 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
          <CheckOutlined />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">You are signed in</h1>
        <p className="mt-3 text-base leading-7 text-slate-500">
          This is a visual login demo. Your Journey workspace is ready for the next step.
        </p>
        <button
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          onClick={onLogout}
          type="button"
        >
          <LogoutOutlined />
          Log out
        </button>
      </section>
    </main>
  )
}

export default AuthenticatedView
