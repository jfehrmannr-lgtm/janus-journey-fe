import Link from 'next/link'

import BrandLogo from '@/components/BrandLogo'

/**
 * Renders the marketing navigation shown above the login hero content.
 *
 * @returns The Janus Journey marketing header.
 */
const MarketingHeader = () => {
  return (
    <header className="relative z-10 flex items-center justify-between gap-6">
      <BrandLogo onDark />
      <nav
        aria-label="Marketing navigation"
        className="flex items-center gap-5 text-sm font-medium sm:gap-8 sm:text-base"
      >
        <Link className="text-slate-200 transition-colors hover:text-white" href="/login">
          Sign in
        </Link>
        <Link
          className="rounded-xl border border-slate-300/80 px-5 py-2.5 text-white transition-colors hover:bg-white/10 sm:px-6"
          href="/login"
        >
          Get started
        </Link>
      </nav>
    </header>
  )
}

export default MarketingHeader
