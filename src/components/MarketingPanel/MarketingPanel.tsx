'use client'

import { ArrowRightOutlined, BarChartOutlined, TeamOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'

import backgroundImage from '@/assets/janus-journey-background.png'
import FeatureHighlight from '@/components/FeatureHighlight/FeatureHighlight'
import MarketingHeader from '@/components/MarketingHeader/MarketingHeader'

/**
 * Renders the dark marketing panel from the login visual reference.
 *
 * @returns The Janus Journey hero and feature panel.
 */
const MarketingPanel = () => {
  return (
    <section className="relative isolate flex min-h-[620px] flex-col overflow-hidden bg-slate-950 px-6 py-7 text-white sm:px-10 sm:py-9 lg:min-h-screen lg:px-16 lg:py-10 xl:px-24 2xl:px-32">
      <Image alt="" className="object-cover object-center" fill priority sizes="100vw" src={backgroundImage} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/55 to-slate-950/20"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <MarketingHeader />

        <div className="relative z-10 flex flex-1 flex-col justify-end pt-24 lg:justify-center lg:pb-0 lg:pt-10">
          <div className="max-w-2xl lg:max-w-5xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Your path, your pace</p>
            <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:max-w-4xl lg:text-7xl xl:text-8xl">
              A space for what you want to <span className="text-blue-300">learn.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 lg:max-w-2xl lg:text-xl lg:leading-9">
              Organize your tasks, create your Journeys, and make progress at your own pace.
            </p>

            <ul
              className="mt-10 grid max-w-xl gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-8"
              aria-label="Janus Journey benefits"
            >
              <FeatureHighlight
                description="Turn your goals into clear, actionable steps."
                icon={<UnorderedListOutlined />}
                title="Stay organized"
              />
              <FeatureHighlight
                description="See how far you have come, one step at a time."
                icon={<BarChartOutlined />}
                title="Track your progress"
              />
              <FeatureHighlight
                description="Inspire others or learn together."
                icon={<TeamOutlined />}
                title="Share your Journeys"
              />
            </ul>

            <div className="mt-10 flex flex-wrap gap-4 pb-2 lg:mt-12">
              <Link
                className="inline-flex items-center gap-4 rounded-xl bg-white px-6 py-4 text-base font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 sm:px-8"
                href="/login"
              >
                Get started
                <ArrowRightOutlined />
              </Link>
              <Link
                className="inline-flex items-center rounded-xl border border-slate-400/50 px-6 py-4 text-base font-medium text-white transition-colors hover:bg-white/10 sm:px-8"
                href="/login"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarketingPanel
