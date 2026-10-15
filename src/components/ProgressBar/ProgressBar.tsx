import type { ProgressBarColor, ProgressBarProps, ProgressBarSize } from './ProgressBar.types'

const PROGRESS_BAR_SIZE_CLASSES: Record<ProgressBarSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  nm: 'h-2.5',
  lg: 'h-3',
  xl: 'h-4'
}

const PROGRESS_BAR_COLOR_CLASSES: Record<ProgressBarColor, string> = {
  primary: 'bg-primary',
  neutral: 'bg-action',
  success: 'bg-task-completed-foreground',
  warning: 'bg-task-in-pause-foreground',
  danger: 'bg-danger-foreground'
}

const normalizeProgress = (progress: number): number => {
  if (!Number.isFinite(progress)) {
    return 0
  }

  return Math.min(100, Math.max(0, progress))
}

/**
 * Renders a responsive semantic progress bar with optional percentage placement.
 *
 * @param size - Thickness of the progress bar.
 * @param progress - Percentage value normalized to the range from 0 to 100.
 * @param showPercent - Placement of the rounded percentage label.
 * @param color - Semantic Janus Journey color used for the filled portion.
 * @param className - Additional classes appended to the component wrapper.
 * @returns A semantic progress bar.
 */
const ProgressBar = ({
  size = 'md',
  progress,
  showPercent = 'right',
  color = 'primary',
  className
}: ProgressBarProps) => {
  const normalizedProgress = normalizeProgress(progress)
  const percentLabel = `${Math.round(normalizedProgress)}%`
  const trackClasses = [
    'relative w-full overflow-hidden rounded-full bg-surface-subtle',
    PROGRESS_BAR_SIZE_CLASSES[size]
  ].join(' ')
  const wrapperClasses = ['flex w-full min-w-0 items-center gap-3', className].filter(Boolean).join(' ')

  const track = (
    <div
      aria-label="Progress"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalizedProgress}
      className={trackClasses}
      role="progressbar"
    >
      <span
        aria-hidden="true"
        className={`block h-full rounded-full ${PROGRESS_BAR_COLOR_CLASSES[color]}`}
        style={{ width: `${normalizedProgress}%` }}
      />
      {showPercent === 'inside' && (
        <span className="absolute inset-0 flex items-center justify-center px-1 text-xs font-semibold leading-none text-text-primary">
          <span className="rounded-full bg-surface/80 px-1.5 py-0.5">{percentLabel}</span>
        </span>
      )}
    </div>
  )

  if (showPercent === 'none' || showPercent === 'inside') {
    return <div className={wrapperClasses}>{track}</div>
  }

  return (
    <div className={wrapperClasses}>
      {showPercent === 'left' && <span className="shrink-0 text-sm font-semibold text-text-muted">{percentLabel}</span>}
      {track}
      {showPercent === 'right' && (
        <span className="shrink-0 text-sm font-semibold text-text-muted">{percentLabel}</span>
      )}
    </div>
  )
}

export default ProgressBar
