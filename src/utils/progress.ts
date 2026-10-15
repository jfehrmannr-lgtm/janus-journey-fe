import type { Task } from '@/types/resource.type'

export interface Progress {
  completed: number
  discarded: number
  pending: number
  inProgress: number
  inPause: number
  total: number
}

/**
 * Calculates visible-task progress without counting folders or hidden tasks.
 *
 * @param tasks - Tasks to include in the progress calculation.
 * @returns Completed, discarded, and total visible task counts.
 */
const calculateProgress = (tasks: Task[]): Progress => {
  const visibleTasks = tasks.filter((task) => task.isVisible)

  return visibleTasks.reduce<Progress>(
    (progress, task) => {
      switch (task.status) {
        case 'completed':
          progress.completed += 1
          break
        case 'discarded':
          progress.discarded += 1
          break
        case 'pending':
          progress.pending += 1
          break
        case 'in-progress':
          progress.inProgress += 1
          break
        case 'in-pause':
          progress.inPause += 1
          break
      }

      progress.total += 1
      return progress
    },
    { completed: 0, discarded: 0, pending: 0, inProgress: 0, inPause: 0, total: 0 }
  )
}

/**
 * Converts task progress into a resolved percentage.
 *
 * @param progress - Progress counts to convert.
 * @returns The resolved percentage, or zero when no visible tasks exist.
 */
const calculateProgressPercentage = ({ completed, discarded, total }: Progress) => {
  if (total === 0) {
    return 0
  }

  return ((completed + discarded) / total) * 100
}

export { calculateProgress, calculateProgressPercentage }
