import journeysMock from '@/mock/journeys.mock.json'
import type { JourneyTreeData, MockDashboardData, NavigationRootResources } from '@/types/resources'

const navigationData = journeysMock as MockDashboardData
const mockRootOwnerUid = 'user-alex'

/**
 * Returns the root resources required by the authenticated application navigation.
 *
 * @returns A promise containing User-owned Journeys, Folders, and Tasks.
 */
const getNavigationRootResources = async (): Promise<NavigationRootResources> => {
  return {
    journeys: navigationData.journeys
      .filter((journey) => journey.parentUid === mockRootOwnerUid)
      .sort((firstJourney, secondJourney) => firstJourney.orderIndex - secondJourney.orderIndex),
    rootFolders: navigationData.folders
      .filter((folder) => folder.parentUid === mockRootOwnerUid)
      .sort((firstFolder, secondFolder) => firstFolder.orderIndex - secondFolder.orderIndex),
    rootTasks: navigationData.tasks
      .filter((task) => task.parentUid === mockRootOwnerUid)
      .sort((firstTask, secondTask) => firstTask.orderIndex - secondTask.orderIndex)
  }
}

/**
 * Returns the direct Folder and Task descendants of one Journey.
 *
 * @param journeyUid - Stable identifier of the Journey to resolve.
 * @returns A promise containing the selected Journey tree resources.
 * @throws An error when the requested Journey does not belong to the mock User.
 */
const getJourneyTree = async (journeyUid: string): Promise<JourneyTreeData> => {
  const journey = navigationData.journeys.find(
    (candidateJourney) => candidateJourney.uid === journeyUid && candidateJourney.parentUid === mockRootOwnerUid
  )

  if (!journey) {
    throw new Error('The requested Journey could not be found.')
  }

  const folders = navigationData.folders
    .filter((folder) => folder.parentUid === journeyUid)
    .sort((firstFolder, secondFolder) => firstFolder.orderIndex - secondFolder.orderIndex)
  const folderUids = new Set(folders.map((folder) => folder.uid))
  const tasks = navigationData.tasks
    .filter((task) => task.parentUid === journeyUid || folderUids.has(task.parentUid))
    .sort((firstTask, secondTask) => firstTask.orderIndex - secondTask.orderIndex)

  return { journey, folders, tasks }
}

export { getJourneyTree, getNavigationRootResources }
