'use client'

import Icon from '@/components/Icon/Icon'
import type { Journey } from '@/types/resource.type'
import { calculateProgressPercentage } from '@/utils/progress'
import type { Progress } from '@/utils/progress'

interface JourneyCardProps {
  journey: Journey
  onClick?: () => void
  className?: string
  selected?: boolean
  showProgress?: boolean
  showLastModified?: boolean
  progress?: Progress
  lastModified?: string
}

/**
 * Formats an ISO date as a compact relative modification label.
 *
 * @param value - ISO date value supplied by the parent.
 * @returns A relative modification label.
 */
const formatRelativeModification = (value: string): string => {
  const timestamp = Date.parse(value)

  if (Number.isNaN(timestamp)) {
    return 'Modified recently'
  }

  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
  const units = [
    { amount: 60 * 60 * 24 * 365, label: 'year' },
    { amount: 60 * 60 * 24 * 30, label: 'month' },
    { amount: 60 * 60 * 24, label: 'day' },
    { amount: 60 * 60, label: 'hour' },
    { amount: 60, label: 'minute' }
  ]
  const unit = units.find(({ amount }) => elapsedSeconds >= amount)

  if (!unit) {
    return 'Modified just now'
  }

  const valueInUnit = Math.floor(elapsedSeconds / unit.amount)
  return `Modified ${valueInUnit} ${unit.label}${valueInUnit === 1 ? '' : 's'} ago`
}

/**
 * Renders a presentational Journey summary card.
 *
 * @param journey - Journey resource represented by the card.
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
          <Icon icon="AppstoreOutlined" />
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
            {resolvedTasks} of {progress.total} tasks
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
