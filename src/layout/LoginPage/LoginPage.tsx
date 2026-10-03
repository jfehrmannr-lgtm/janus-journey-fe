import BrandLogo from '@/components/BrandLogo/BrandLogo'
import LoginForm from '@/components/LoginForm/LoginForm'

/**
 * Renders the Janus Journey login experience.
 *
 * @returns The login page experience.
 */
const LoginPage = () => {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/50 via-slate-50 to-orange-50/30 px-6 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-24 2xl:px-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-blue-100/40 blur-3xl"
      />
      <section className="relative z-10 w-full max-w-md lg:max-w-xl">
        <div className="flex justify-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              <BrandLogo compact />
            </div>
            <p className="text-3xl font-semibold tracking-tight text-slate-950">Janus Journey</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8 lg:mt-10 lg:rounded-3xl lg:p-10">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to continue your journey.</p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}

export default LoginPage
