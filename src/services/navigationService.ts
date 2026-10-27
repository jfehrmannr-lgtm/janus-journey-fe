import type { Folder, Journey, ResourceProgress, Task } from '@/types/resource.type'
import type {
  ApiFolder,
  ApiFolderWithTasks,
  ApiJourney,
  ApiJourneyWithResources,
  ApiTask,
  ResourceResponse,
  RootResourceResponse
} from '@/types/resource-api.type'
import type { JourneyTreeData, NavigationRootResources } from '@/types/navigation.type'
import type { ResourceType } from '@/types/resource.type'

type BffRequester = <T>(path: string, init?: RequestInit) => Promise<T>

/**
 * Returns the root resources required by the authenticated application navigation.
 *
 * @param requester - BFF requester used to retrieve the root resources.
 * @returns A promise containing the authenticated User's root Journeys, Folders, and Tasks.
 */
const getNavigationRootResources = async (requester: BffRequester): Promise<NavigationRootResources> => {
  const response = await requester<RootResourceResponse>('/journeys/root')
  const rootItems = response.payload

  return {
    journeys: rootItems.journeys.map(mapJourney),
    rootFolders: rootItems.folders.map(mapFolder).sort(sortByOrderIndex),
    rootTasks: rootItems.tasks.map(mapTask).sort(sortByOrderIndex)
  }
}

/**
 * Returns the selected Journey or Folder and its descendants in the Tree data shape.
 *
 * @param requester - BFF requester used to retrieve the selected resource.
 * @param resourceType - Type of the selected resource.
 * @param resourceId - Stable identifier of the selected resource.
 * @returns A promise containing the selected resource tree resources.
 */
const getResourceTree = async (
  requester: BffRequester,
  resourceType: ResourceType,
  resourceId: string
): Promise<JourneyTreeData> => {
  const response = await requester<ResourceResponse>(
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

const mapJourneyTree = (journey: ApiJourneyWithResources): JourneyTreeData => ({
  rootResourceUid: journey.uid,
  rootResource: {
    uid: journey.uid,
    type: journey.type,
    name: journey.name,
    description: journey.description ?? ''
  },
  folders: journey.folders.map(mapFolder),
  tasks: [...journey.folders.flatMap((folder) => folder.tasks), ...journey.tasks].map(mapTask)
})

const mapFolderTree = (folder: ApiFolderWithTasks): JourneyTreeData => ({
  rootResourceUid: folder.uid,
  rootResource: {
    uid: folder.uid,
    type: folder.type,
    name: folder.name,
    description: folder.description ?? ''
  },
  folders: [],
  tasks: folder.tasks.map(mapTask)
})

const mapJourney = (journey: ApiJourneyWithResources | ApiJourney): Journey => ({
  uid: journey.uid,
  type: 'journey',
  parentUid: journey.parent.uid,
  name: journey.name,
  description: journey.description ?? '',
  imgUrl: journey.imgUrl,
  updatedAt: journey.updatedAt,
  progress: mapProgress(journey.progress)
})

const mapFolder = (folder: ApiFolder): Folder => ({
  uid: folder.uid,
  type: 'folder',
  parentUid: folder.parent.uid,
  name: folder.name,
  description: folder.description ?? '',
  orderIndex: normalizeOrderIndex(folder.orderIndex),
  updatedAt: folder.updatedAt,
  progress: mapProgress(folder.progress)
})

const mapTask = (task: ApiTask): Task => ({
  uid: task.uid,
  type: 'task',
  parentUid: task.parent.uid,
  name: task.name,
  description: task.description ?? '',
  updatedAt: task.updatedAt,
  state: task.state,
  isVisible: task.isVisible,
  orderIndex: normalizeOrderIndex(task.orderIndex)
})

/**
 * Converts an API progress summary to the frontend progress shape.
 *
 * @param progress - Optional API progress summary.
 * @returns Frontend progress data or undefined when the API omitted progress.
 */
const mapProgress = (progress: ApiJourney['progress']): ResourceProgress | undefined => {
  if (!progress) {
    return undefined
  }

  return {
    completed: progress.completed,
    discarded: progress.discarded,
    pending: Math.max(0, progress.total - progress.completed - progress.discarded),
    inProgress: 0,
    inPause: 0,
    total: progress.total
  }
}

const normalizeOrderIndex = (orderIndex: unknown): number => {
  return typeof orderIndex === 'number' && Number.isFinite(orderIndex) ? orderIndex : 0
}

const sortByOrderIndex = <T extends { orderIndex: number }>(first: T, second: T): number => {
  return first.orderIndex - second.orderIndex
}

export { getNavigationRootResources, getResourceTree }
