import type { DashboardHomeData } from '@/types/dashboard.type'
import type { NavigationRootResources } from '@/types/navigation.type'

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

export { getDashboardHomeData }
