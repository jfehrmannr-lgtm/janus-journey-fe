import { requestBff } from '@/services/bffClient'
import type {
  Folder,
  JourneyTreeData,
  MockDashboardData,
  NavigationRootResources,
  ResourceApiResponse,
  ResourceType,
  Task
} from '@/types/resources'

interface NavigationRootResponse {
  items?: Pick<MockDashboardData, 'tasks' | 'folders' | 'journeys'>
  payload?: Pick<MockDashboardData, 'tasks' | 'folders' | 'journeys'>
  registers: number
}

type ApiTask = Extract<ResourceApiResponse['payload'], { type: 'task' }>
type ApiFolder = Extract<ResourceApiResponse['payload'], { type: 'folder' }>
type ApiJourney = Extract<ResourceApiResponse['payload'], { type: 'journey' }>

/**
 * Returns the root resources required by the authenticated application navigation.
 *
 * @returns A promise containing the authenticated User's root Journeys, Folders, and Tasks.
 */
const getNavigationRootResources = async (): Promise<NavigationRootResources> => {
  const response = await requestBff<NavigationRootResponse>('/journeys/root')
  const rootItems = response.items ?? response.payload

  if (!rootItems) {
    throw new Error('The BFF root resources response did not contain resource items.')
  }

  return {
    journeys: [...rootItems.journeys].sort(
      (firstJourney, secondJourney) => firstJourney.orderIndex - secondJourney.orderIndex
    ),
    rootFolders: [...rootItems.folders].sort(
      (firstFolder, secondFolder) => firstFolder.orderIndex - secondFolder.orderIndex
    ),
    rootTasks: [...rootItems.tasks].sort((firstTask, secondTask) => firstTask.orderIndex - secondTask.orderIndex)
  }
}

/**
 * Returns the selected Journey or Folder and its descendants in the Tree data shape.
 *
 * @param resourceType - Type of the selected resource.
 * @param resourceId - Stable identifier of the selected resource.
 * @returns A promise containing the selected resource tree resources.
 */
const getResourceTree = async (resourceType: ResourceType, resourceId: string): Promise<JourneyTreeData> => {
  const response = await requestBff<ResourceApiResponse>(
    `/journeys/resources/${encodeURIComponent(resourceType)}/${encodeURIComponent(resourceId)}`
  )

  if (response.payload.type === 'journey') {
    return mapJourneyTree(response.payload)
  }

  if (response.payload.type === 'folder') {
    return mapFolderTree(response.payload)
  }

  throw new Error('The selected resource cannot be rendered as a Tree.')
}

const mapJourneyTree = (journey: ApiJourney): JourneyTreeData => ({
  rootResourceUid: journey.uid,
  folders: journey.folders.map(mapFolder),
  tasks: [...journey.folders.flatMap((folder) => folder.tasks), ...journey.tasks].map(mapTask)
})

const mapFolderTree = (folder: ApiFolder): JourneyTreeData => ({
  rootResourceUid: folder.uid,
  folders: [],
  tasks: folder.tasks.map(mapTask)
})

const mapFolder = (folder: ApiFolder): Folder => ({
  uid: folder.uid,
  type: 'folder',
  parentUid: folder.parent.uid,
  name: folder.name,
  description: folder.description ?? '',
  orderIndex: folder.orderIndex ?? 0
})

const mapTask = (task: ApiTask): Task => ({
  uid: task.uid,
  type: 'task',
  parentUid: task.parent.uid,
  name: task.name,
  description: task.description ?? '',
  status: mapTaskStatus(task.state),
  isVisible: task.isVisible,
  orderIndex: task.orderIndex ?? 0
})

const mapTaskStatus = (state: ApiTask['state']): Task['status'] => {
  return state
}

export { getNavigationRootResources, getResourceTree }
