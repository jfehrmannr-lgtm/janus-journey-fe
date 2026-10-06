'use client'

import {
  AppstoreOutlined,
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'
import type { ReactNode } from 'react'

import { authClient } from '@/services/authClient'
import type { DashboardHomeData, DashboardMetricTone, DashboardQuickAction } from '@/types/dashboard'

interface DashboardHomeProps {
  data: DashboardHomeData
}

const metricStyles: Record<DashboardMetricTone, { icon: string; value: string }> = {
  blue: { icon: 'bg-blue-50 text-blue-600', value: 'text-slate-950' },
  green: { icon: 'bg-emerald-50 text-emerald-600', value: 'text-slate-950' },
  indigo: { icon: 'bg-indigo-50 text-indigo-600', value: 'text-slate-950' },
  amber: { icon: 'bg-amber-50 text-amber-600', value: 'text-slate-950' }
}

/**
 * Maps a progress percentage to a Tailwind width utility.
 *
 * @param progressPercent - Progress percentage to represent.
 * @returns A Tailwind width class for the progress bar.
 */
const getProgressWidthClass = (progressPercent: number) => {
  if (progressPercent >= 75) {
    return 'w-3/4'
  }

  if (progressPercent >= 50) {
    return 'w-1/2'
  }

  if (progressPercent >= 25) {
    return 'w-1/4'
  }

  return 'w-0'
}

/**
 * Renders the first visual Dashboard Home workspace.
 *
 * @param data - Dashboard Home metrics, Journey summaries, and quick actions.
 * @returns The Dashboard Home workspace.
 */
const DashboardHome = ({ data }: DashboardHomeProps) => {
  const { data: session } = authClient.useSession()
  const username = session?.user.name?.split(' ')[0] ?? 'there'
  const metricIcons = {
    'active-journeys': <AppstoreOutlined />,
    'tasks-completed': <CheckCircleOutlined />,
    'tasks-in-progress': <ClockCircleOutlined />,
    'tasks-remaining': <ThunderboltOutlined />
  }
  const quickActionIcons: Record<DashboardQuickAction, ReactNode> = {
    journey: <AppstoreOutlined />,
    task: <PlusOutlined />,
    explore: <ThunderboltOutlined />,
    shared: <TeamOutlined />
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center gap-3">
          <div className="relative flex min-w-0 flex-1 items-center">
            <SearchOutlined className="absolute left-4 text-slate-400" />
            <input
              aria-label="Search your Janus Journey workspace"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              placeholder="Search tasks, journeys, or anything..."
              type="search"
            />
          </div>
          <button
            className="hidden h-12 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:flex"
            type="button"
          >
            <PlusOutlined />
            Create
          </button>
          <button
            aria-label="Notifications"
            className="flex size-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 transition-colors hover:bg-slate-50"
            type="button"
          >
            <BellOutlined />
          </button>
        </header>

        <section className="mt-10">
          <p className="text-sm font-medium text-slate-500">Good morning,</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{username}</h1>
          <p className="mt-3 text-base text-slate-500">Keep going. Small steps compound over time.</p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Workspace summary">
          {data.metrics.map((metric) => (
            <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm" key={metric.key}>
              <div className="flex items-center gap-4">
                <span
                  className={`flex size-11 items-center justify-center rounded-full text-lg ${metricStyles[metric.tone].icon}`}
                >
                  {metricIcons[metric.key as keyof typeof metricIcons]}
                </span>
                <div>
                  <p className={`text-2xl font-semibold ${metricStyles[metric.tone].value}`}>{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12" aria-labelledby="my-journeys-title">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950" id="my-journeys-title">
              My Journeys
            </h2>
            <button className="hidden items-center gap-2 text-sm font-semibold text-blue-700 sm:flex" type="button">
              View all
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {data.journeys.map((summary, index) => (
              <article
                className={`rounded-2xl border bg-white p-5 shadow-sm transition-colors ${index === 0 ? 'border-blue-400 ring-1 ring-blue-400/30' : 'border-slate-200/80'}`}
                key={summary.journey.uid}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${index % 2 === 0 ? 'bg-blue-50 text-blue-700' : 'bg-indigo-50 text-indigo-700'}`}
                  >
                    <FolderOpenOutlined className="text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">{summary.journey.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{summary.journey.description}</p>
                      </div>
                      <span className="text-xl text-slate-400" aria-hidden="true">
                        ›
                      </span>
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full bg-blue-500 ${getProgressWidthClass(summary.progressPercent)}`}
                        />
                      </div>
                      <span className="whitespace-nowrap text-sm text-slate-500">
                        {summary.completedTasks} / {summary.totalTasks} tasks
                      </span>
                      <span className="text-sm font-semibold text-slate-700">{summary.progressPercent}%</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 pb-8" aria-labelledby="quick-actions-title">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950" id="quick-actions-title">
            Quick actions
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.quickActions.map((action) => (
              <button
                className="rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition-transform hover:-translate-y-0.5"
                key={action.key}
                type="button"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-700">
                  {quickActionIcons[action.key]}
                </span>
                <span className="mt-4 block text-sm font-semibold text-slate-950">{action.title}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-500">{action.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardHome
