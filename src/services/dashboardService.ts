import type { DashboardHomeData } from '@/types/dashboard.type'
import type { NavigationRootResources } from '@/types/navigation.type'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { calculateProgress } from '@/modules/dashboard/utils/progress'

/**
 * Builds summary data required by the Dashboard Home view from normalized root resources.
 *
 * @param resources - Normalized root resources returned by the BFF.
 * @returns Dashboard Home metrics and quick actions.
 */
const getDashboardHomeData = (resources: NavigationRootResources): DashboardHomeData => {
  const completedTasks = resources.rootTasks.filter((task) => task.state === 'completed').length
  const inProgressTasks = resources.rootTasks.filter((task) => task.state === 'in-progress').length
  const remainingTasks = resources.rootTasks.filter(
    (task) => task.state !== 'completed' && task.state !== 'discarded'
  ).length

  return {
    metrics: [
      { key: 'active-journeys', value: resources.journeys.length, label: 'Active journeys', tone: 'blue' },
      { key: 'tasks-completed', value: completedTasks, label: 'Tasks completed', tone: 'green' },
      { key: 'tasks-in-progress', value: inProgressTasks, label: 'Tasks in progress', tone: 'indigo' },
      { key: 'tasks-remaining', value: remainingTasks, label: 'Tasks remaining', tone: 'amber' }
    ],
    quickActions: [
      { key: 'journey', title: 'Create Journey', description: 'Start a new structured path.' },
      { key: 'task', title: 'Add Task', description: 'Add a quick task without a Journey.' },
      { key: 'explore', title: 'Explore Journeys', description: 'Find and copy shared Journeys.' },
      { key: 'shared', title: 'View Shared', description: 'Journeys shared with you.' }
    ]
  }
}

/**
 * Recalculates Folder and Journey progress from the current API resource hierarchy.
 *
 * @param journey - Journey resource whose descendants should be recalculated.
 * @returns The Journey with synchronized Folder and Journey progress.
 */
const synchronizeJourneyProgress = (journey: ApiJourneyWithResources): ApiJourneyWithResources => {
  const folders = journey.folders.map((folder) => ({
    ...folder,
    progress: calculateProgress(folder.tasks)
  }))
  const tasks = [...folders.flatMap((folder) => folder.tasks), ...journey.tasks]

  return {
    ...journey,
    folders,
    progress: calculateProgress(tasks)
  }
}

/**
 * Resolves the latest server-provided activity timestamp without creating a client timestamp.
 *
 * @param currentActivityAt - Existing Journey activity timestamp.
 * @param resources - Resources returned by a successful mutation.
 * @returns The latest valid timestamp from the existing Journey or mutation response.
 */
const getLatestActivityAt = (currentActivityAt: string, resources: Array<{ lastActivityAt: string }>): string => {
  return resources.reduce((latestActivityAt, resource) => {
    const latestTime = Date.parse(latestActivityAt)
    const resourceTime = Date.parse(resource.lastActivityAt)

    return !Number.isNaN(resourceTime) && (Number.isNaN(latestTime) || resourceTime > latestTime)
      ? resource.lastActivityAt
      : latestActivityAt
  }, currentActivityAt)
}

/**
 * Copies the selected API Journey's activity and progress into root navigation resources.
 *
 * @param resources - Root navigation resources currently cached by React Query.
 * @param journey - Synchronized selected Journey resource.
 * @returns Root navigation resources with the matching Journey updated in place.
 */
const synchronizeJourneyInRootResources = (
  resources: NavigationRootResources,
  journey: ApiJourneyWithResources
): NavigationRootResources => ({
  ...resources,
  journeys: resources.journeys.map((currentJourney) =>
    currentJourney.uid === journey.uid
      ? {
          ...currentJourney,
          lastActivityAt: journey.lastActivityAt,
          progress: journey.progress
        }
      : currentJourney
  )
})

export { getDashboardHomeData, getLatestActivityAt, synchronizeJourneyInRootResources, synchronizeJourneyProgress }
