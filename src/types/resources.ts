export type TaskStatus = 'pending' | 'in-pause' | 'completed' | 'discarded'

export interface UserConfig {
  username: string
  avatarUrl: string | null
}

export interface User {
  id: string
  userId: string
  email: string
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
  journey: Journey
  folders: Folder[]
  tasks: Task[]
}
