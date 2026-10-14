export type TaskStatus = 'pending' | 'in-progress' | 'complete' | 'in-pause' | 'completed' | 'discarded'
export type ResourceType = 'journey' | 'folder' | 'task'

export interface UserConfig {
  username: string
  avatarUrl: string | null
}

export interface User {
  id: string
  userId: string
  email: string
  isVerified: boolean
  authLogins: Array<{
    authLogin: string
    provider: string
    providerEmail: string | null
    providerUsername: string | null
    providerAvatarUrl: string | null
    metadata: Record<string, unknown>
    createdAt: string
    lastLoginAt: string
  }>
  config: UserConfig
}

export interface Journey {
  uid: string
  type: 'journey'
  parentUid: string
  name: string
  description: string
  orderIndex: number
}

export interface Folder {
  uid: string
  type: 'folder'
  parentUid: string
  name: string
  description: string
  orderIndex: number
}

export interface Task {
  uid: string
  type: 'task'
  parentUid: string
  name: string
  description: string
  status: TaskStatus
  isVisible: boolean
  orderIndex: number
}

interface ApiParentReference {
  uid: string
  type: 'user' | 'journey' | 'folder'
}

interface ApiTaskResource {
  uid: string
  type: 'task'
  parent: ApiParentReference
  name: string
  description: string | null
  taskType: null
  state: 'pending' | 'in-progress' | 'complete' | 'in-pause' | 'discarded'
  isVisible: boolean
  orderIndex: number | null
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

interface ApiFolderResource {
  uid: string
  type: 'folder'
  parent: ApiParentReference
  name: string
  description: string | null
  orderIndex: number | null
  metadata: Record<string, unknown>
  tasks: ApiTaskResource[]
  createdAt: string
  updatedAt: string
}

interface ApiJourneyResource {
  uid: string
  type: 'journey'
  parent: ApiParentReference
  name: string
  description: string | null
  metadata: Record<string, unknown>
  folders: ApiFolderResource[]
  tasks: ApiTaskResource[]
  createdAt: string
  updatedAt: string
}

export interface ResourceApiResponse {
  payload: ApiJourneyResource | ApiFolderResource | ApiTaskResource
}

export interface MockDashboardData {
  journeys: Journey[]
  folders: Folder[]
  tasks: Task[]
  dashboardHome: MockDashboardHomeData
}

export interface MockDashboardHomeData {
  metrics: Array<{
    key: string
    value: number
    label: string
    tone: 'blue' | 'green' | 'indigo' | 'amber'
  }>
  journeySummaries: Array<{
    journeyUid: string
    completedTasks: number
    totalTasks: number
    progressPercent: number
  }>
  quickActions: Array<{
    key: 'journey' | 'task' | 'explore' | 'shared'
    title: string
    description: string
  }>
}

export interface NavigationRootResources {
  journeys: Journey[]
  rootFolders: Folder[]
  rootTasks: Task[]
}

export interface JourneyTreeData {
  rootResourceUid: string
  rootResource: {
    uid: string
    type: 'journey' | 'folder'
    name: string
    description: string
  }
  folders: Folder[]
  tasks: Task[]
}
