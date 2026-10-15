export type ProgressBarSize = 'sm' | 'md' | 'nm' | 'lg' | 'xl'
export type ProgressBarPercentPosition = 'none' | 'left' | 'right' | 'inside'
export type ProgressBarColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger'

export interface ProgressBarProps {
  size?: ProgressBarSize
  progress: number
  showPercent?: ProgressBarPercentPosition
  color?: ProgressBarColor
  className?: string
}
