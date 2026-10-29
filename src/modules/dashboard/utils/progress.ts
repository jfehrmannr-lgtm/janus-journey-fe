import type { ResourceProgress, Task } from '@/types/resource.type'

/**
 * Calculates visible-task progress without counting folders or hidden tasks.
 *
 * @param tasks - Tasks to include in the progress calculation.
 * @returns Completed, discarded, total, and percentage values for visible tasks.
 */
const calculateProgress = (tasks: Task[]): ResourceProgress => {
  const visibleTasks = tasks.filter((task) => task.isVisible)
  const completed = visibleTasks.filter((task) => task.state === 'completed').length
  const discarded = visibleTasks.filter((task) => task.state === 'discarded').length
  const total = visibleTasks.length

  return {
    completed,
    discarded,
    total,
    percentage: total === 0 ? 0 : ((completed + discarded) / total) * 100
  }
}

/**
 * Converts task progress into a resolved percentage.
 *
 * @param progress - Progress counts to convert.
 * @returns The resolved percentage, or zero when no visible tasks exist.
 */
const calculateProgressPercentage = ({ percentage }: ResourceProgress) => percentage

export { calculateProgress, calculateProgressPercentage }
