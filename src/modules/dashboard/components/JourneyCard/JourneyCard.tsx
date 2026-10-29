'use client'

import Icon from '@/components/Icon/Icon'
import type { IconName } from '@/components/Icon/Icon'
import type { Journey, ResourceType } from '@/types/resource.type'
import { calculateProgressPercentage } from '@/modules/dashboard/utils/progress'
import type { Progress } from '@/modules/dashboard/utils/progress'

interface JourneyCardProps {
  journey: Journey
  type?: ResourceType
  onClick?: () => void
  className?: string
  selected?: boolean
  showProgress?: boolean
  showLastModified?: boolean
  progress?: Progress
  lastModified?: string
}

/**
 * Formats an ISO date as a local-calendar relative activity label.
 *
 * @param value - ISO date value supplied by the parent.
 * @returns A relative modification label.
 */
const formatRelativeModification = (value: string): string => {
  const activityDate = new Date(value)

  if (Number.isNaN(activityDate.getTime())) {
    return 'Modified recently'
  }

  const now = new Date()
  const activityDay = Date.UTC(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate())
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const calendarDaysAgo = Math.floor((today - activityDay) / (24 * 60 * 60 * 1000))

  if (calendarDaysAgo === 0) {
    const time = activityDate.toLocaleTimeString(undefined, {
      hour: '2-digit',
      hour12: false,
      minute: '2-digit'
    })

    return `Modified today at ${time}`
  }

  if (calendarDaysAgo > 0) {
    return `Modified ${calendarDaysAgo} day${calendarDaysAgo === 1 ? '' : 's'} ago`
  }

  return 'Modified recently'
}

/**
 * Renders a presentational Journey summary card.
 *
 * @param journey - Journey resource represented by the card.
 * @param type - Resource type that determines the card icon.
 * @param onClick - Callback invoked when the card is selected.
 * @param className - Additional classes appended to the card base styles.
 * @param selected - Whether the card is currently selected.
 * @param showProgress - Whether progress details should be rendered when available.
 * @param showLastModified - Whether the last-modified detail should be rendered when available.
 * @param progress - Optional task progress calculated by the parent.
 * @param lastModified - Optional ISO date supplied by the parent.
 * @returns A keyboard-accessible Journey card.
 */
const JourneyCard = ({
  journey,
  type = 'journey',
  onClick,
  className,
  selected = false,
  showProgress = true,
  showLastModified = true,
  progress,
  lastModified
}: JourneyCardProps) => {
  const shouldShowProgress = showProgress && progress !== undefined
  const shouldShowLastModified = showLastModified && lastModified !== undefined
  const resourceIcons: Record<ResourceType, IconName> = {
    journey: 'CompassOutlined',
    folder: 'FolderOutlined',
    task: 'CheckSquareOutlined'
  }
  const progressPercentage = progress === undefined ? 0 : Math.min(100, calculateProgressPercentage(progress))
  const resolvedTasks = progress === undefined ? 0 : progress.completed + progress.discarded
  const classes = [
    'group flex w-full min-w-0 cursor-pointer flex-col gap-5 rounded-2xl border bg-surface p-5 text-left transition-colors',
    'hover:border-primary/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20',
    selected ? 'border-primary ring-1 ring-primary/20' : 'border-border/80',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button aria-pressed={selected} className={classes} onClick={onClick} type="button">
      <span className="flex min-w-0 items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-lg text-primary-foreground">
          <Icon icon={resourceIcons[type]} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-lg font-semibold text-text-primary">{journey.name}</span>
          <span className="mt-1 block line-clamp-2 text-sm leading-6 text-text-muted">
            {journey.description || 'No description available.'}
          </span>
        </span>
        <Icon
          className="mt-1 shrink-0 text-lg text-text-subtle transition-colors group-hover:text-primary"
          icon="RightOutlined"
        />
      </span>
      {shouldShowProgress && (
        <span className="block">
          <span className="flex items-center justify-between gap-3 text-xs font-semibold text-text-muted">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </span>
          <span className="mt-2 block h-2 overflow-hidden rounded-full bg-surface-subtle">
            <span
              aria-hidden="true"
              className="block h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${progressPercentage}%` }}
            />
          </span>
          <span className="mt-2 block text-xs text-text-muted">
            {resolvedTasks} of {progress?.total} tasks
          </span>
        </span>
      )}
      {shouldShowLastModified && (
        <span className="flex items-center gap-2 text-xs text-text-muted">
          <Icon icon="ClockCircleOutlined" />
          <span>{formatRelativeModification(lastModified)}</span>
        </span>
      )}
    </button>
  )
}

export default JourneyCard
