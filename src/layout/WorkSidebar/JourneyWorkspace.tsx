'use client'

import backgroundImage from '@/assets/janus-journey-background.png'
import Icon from '@/components/Icon/Icon'
import JourneyTree from '@/layout/SideNav/JourneyTree'
import type { JourneyTreeData } from '@/types/resources'
import { calculateProgress, calculateProgressPercentage } from '@/utils/progress'

interface JourneyWorkspaceProps {
  data: JourneyTreeData
}

/**
 * Renders the selected resource in the Journey workspace visual treatment.
 *
 * @param data - Resolved Journey or Folder data and its descendants.
 * @returns The selected Journey workspace content.
 */
const JourneyWorkspace = ({ data }: JourneyWorkspaceProps) => {
  const isJourney = data.rootResource.type === 'journey'
  const progress = calculateProgress(data.tasks)
  const resolvedTasks = progress.completed + progress.discarded
  const progressPercentage = Math.round(calculateProgressPercentage(progress))
  const progressSegments = [
    { count: progress.completed, colorClass: 'bg-task-completed-foreground', label: 'completed' },
    { count: progress.discarded, colorClass: 'bg-task-discarded-foreground', label: 'discarded' },
    { count: progress.pending, colorClass: 'bg-task-pending-foreground', label: 'pending' },
    { count: progress.inProgress, colorClass: 'bg-task-in-progress-foreground', label: 'in progress' },
    { count: progress.inPause, colorClass: 'bg-task-in-pause-foreground', label: 'in pause' }
  ]

  return (
    <div className="min-h-full bg-white">
      <header
        className="relative flex min-h-44 flex-col justify-end overflow-hidden bg-cover bg-center px-5 py-5 text-white"
        style={{
          backgroundImage: `linear-gradient(to top, rgb(15 23 42 / 0.85), rgb(15 23 42 / 0.15)), url(${backgroundImage.src})`
        }}
      >
        <span className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg bg-surface-inverse/40 text-lg text-white">
          <Icon icon="EllipsisOutlined" />
        </span>
        <div className="relative">
          <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-white/15 text-white">
            <Icon icon={isJourney ? 'AppstoreOutlined' : 'FolderOutlined'} />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{data.rootResource.name}</h2>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-100">
            {data.rootResource.description || 'No description available.'}
          </p>
        </div>
      </header>

      {isJourney && (
        <section aria-label="Journey progress" className="border-b border-border-subtle px-5 py-4">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <div
              aria-label={progressSegments
                .filter((segment) => segment.count > 0)
                .map((segment) => `${segment.count} ${segment.label}`)
                .join(', ')}
              className="flex h-2 flex-1 overflow-hidden rounded-full bg-surface-subtle"
              role="img"
            >
              {progressSegments.map((segment) => (
                <div
                  className={`h-full ${segment.colorClass}`}
                  key={segment.label}
                  style={{ width: progress.total === 0 ? '0%' : `${(segment.count / progress.total) * 100}%` }}
                />
              ))}
            </div>
            <span className="whitespace-nowrap">
              {resolvedTasks} / {progress.total} tasks
            </span>
            <span className="font-semibold text-text-body">{progressPercentage}%</span>
          </div>
        </section>
      )}

      <nav aria-label="Journey sections" className="flex items-center gap-5 border-b border-border px-5 pt-4">
        <span className="border-b-2 border-primary pb-3 text-sm font-semibold text-text-primary">Tasks</span>
        <span className="pb-3 text-sm text-text-muted">Overview</span>
        <span className="pb-3 text-sm text-text-muted">Notes</span>
        <span className="pb-3 text-sm text-text-muted">Share</span>
      </nav>

      <section aria-labelledby="workspace-tasks" className="px-5 py-4">
        <h3 className="sr-only" id="workspace-tasks">
          Tasks
        </h3>
        <JourneyTree data={data} key={data.rootResourceUid} />
      </section>
    </div>
  )
}

export default JourneyWorkspace
