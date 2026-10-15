import type { Folder, Journey, Task } from '@/types/resource.type'

export interface NavigationRootResources {
  journeys: Journey[]
  rootFolders: Folder[]
  rootTasks: Task[]
}

export interface JourneyTreeRootResource {
  uid: string
  type: 'journey' | 'folder'
  name: string
  description: string
}

export interface JourneyTreeData {
  rootResourceUid: string
  rootResource: JourneyTreeRootResource
  folders: Folder[]
  tasks: Task[]
}
