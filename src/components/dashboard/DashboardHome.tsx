'use client'

import type { ReactNode } from 'react'

import Icon from '@/components/Icon/Icon'
import JourneyCard from '@/components/JourneyCard/JourneyCard'
import { authClient } from '@/services/authClient'
import type { DashboardHomeData, DashboardMetricTone, DashboardQuickAction } from '@/types/dashboard.type'
import type { Journey } from '@/types/resource.type'
import { useRouter } from 'next/navigation'

interface DashboardHomeProps {
  data: DashboardHomeData
  journeys: Journey[]
}

const metricStyles: Record<DashboardMetricTone, { icon: string; value: string }> = {
  blue: { icon: 'bg-primary-soft text-primary', value: 'text-text-primary' },
  green: { icon: 'bg-emerald-50 text-emerald-600', value: 'text-text-primary' },
  indigo: { icon: 'bg-indigo-50 text-indigo-600', value: 'text-text-primary' },
  amber: { icon: 'bg-amber-50 text-amber-600', value: 'text-text-primary' }
}

/**
 * Renders the first visual Dashboard Home workspace.
 *
 * @param data - Dashboard Home metrics and quick actions.
 * @param journeys - Real root Journeys available to the authenticated User.
 * @returns The Dashboard Home workspace.
 */
const DashboardHome = ({ data, journeys }: DashboardHomeProps) => {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const username = session?.user.name?.split(' ')[0] ?? 'there'
  const metricIcons = {
    'active-journeys': <Icon icon="AppstoreOutlined" />,
    'tasks-completed': <Icon icon="CheckCircleOutlined" />,
    'tasks-in-progress': <Icon icon="ClockCircleOutlined" />,
    'tasks-remaining': <Icon icon="ThunderboltOutlined" />
  }
  const quickActionIcons: Record<DashboardQuickAction, ReactNode> = {
    journey: <Icon icon="AppstoreOutlined" />,
    task: <Icon icon="PlusOutlined" />,
    explore: <Icon icon="ThunderboltOutlined" />,
    shared: <Icon icon="TeamOutlined" />
  }

  const navigateToCreateJourney = () => {
    router.push('/dashboard/create/journey')
  }

  return (
    <div className="min-h-screen bg-surface-page px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center gap-3">
          <div className="relative flex min-w-0 flex-1 items-center">
            <Icon className="absolute left-4 text-text-subtle" icon="SearchOutlined" />
            <input
              aria-label="Search your Janus Journey workspace"
              className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10"
              placeholder="Search tasks, journeys, or anything..."
              type="search"
            />
          </div>
          <button
            className="hidden h-12 items-center gap-2 rounded-xl bg-action px-5 text-sm font-semibold text-white transition-colors hover:bg-action-hover sm:flex"
            type="button"
          >
            <Icon icon="PlusOutlined" />
            Create
          </button>
          <button
            aria-label="Notifications"
            className="flex size-12 items-center justify-center rounded-xl border border-border bg-surface text-lg text-text-body transition-colors hover:bg-surface-subtle"
            type="button"
          >
            <Icon icon="BellOutlined" />
          </button>
        </header>

        <section className="mt-10 space-y-2">
          <h1 className="mt-1 text-4xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Good morning, {username}
          </h1>
          <span className="text-text-body">What are we going to work on today?</span>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Workspace summary">
          {data.metrics.map((metric) => (
            <article className="rounded-2xl border border-border/80 bg-surface p-2 px-4" key={metric.key}>
              <div className="flex items-center gap-4">
                <span
                  className={`flex size-8 items-center justify-center rounded-full text-lg ${metricStyles[metric.tone].icon}`}
                >
                  {metricIcons[metric.key as keyof typeof metricIcons]}
                </span>
                <div>
                  <p className={`text-2xl font-semibold ${metricStyles[metric.tone].value}`}>{metric.value}</p>
                  <p className="text-sm text-text-muted">{metric.label}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12" aria-labelledby="my-journeys-title">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary" id="my-journeys-title">
              My Journeys
            </h2>
            <button
              className="hidden items-center gap-2 text-sm font-semibold text-primary-foreground sm:flex"
              type="button"
            >
              View all
              <span aria-hidden="true">→</span>
            </button>
          </div>
          {journeys.length > 0 ? (
            <div className="mt-5 grid gap-2 xl:grid-cols-1">
              {journeys.map((journey) => (
                <JourneyCard journey={journey} key={journey.uid} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-10 text-center">
              <Icon className="text-3xl text-text-subtle" icon="AppstoreOutlined" />
              <h3 className="mt-4 text-lg font-semibold text-text-primary">No Journeys yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">
                Create your first Journey to organize goals, tasks, and progress in one place.
              </p>
              <button
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                onClick={navigateToCreateJourney}
                type="button"
              >
                <Icon icon="PlusOutlined" />
                Create Journey
              </button>
            </div>
          )}
        </section>

        <section className="mt-12 pb-8" aria-labelledby="quick-actions-title">
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary" id="quick-actions-title">
            Quick actions
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.quickActions.map((action) => (
              <button
                className="cursor-pointer rounded-2xl border border-border/80 bg-surface p-5 text-left hover:border-blue-300 transition"
                key={action.key}
                onClick={action.key === 'journey' ? navigateToCreateJourney : undefined}
                type="button"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-lg text-primary-foreground">
                  {quickActionIcons[action.key]}
                </span>
                <span className="mt-4 block text-sm font-semibold text-text-primary">{action.title}</span>
                <span className="mt-2 block text-sm leading-6 text-text-muted">{action.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardHome
