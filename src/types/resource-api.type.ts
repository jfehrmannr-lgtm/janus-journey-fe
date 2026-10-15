import type { ApiResponse } from '@/types/api.type'
import type { ResourceType } from '@/types/resource.type'

export type ApiParentType = 'user' | 'journey' | 'folder'
export type ApiTaskState = 'pending' | 'in-progress' | 'complete' | 'in-pause' | 'discarded'

export interface ApiParentReference {
  uid: string
  type: ApiParentType
}

export interface ApiProgress {
  completed: number
  discarded: number
  total: number
  percentage: number
}

export interface ApiResourceBase<TType extends ResourceType> {
  uid: string
  type: TType
  parent: ApiParentReference
  name: string
  description: string | null
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface ApiJourney extends ApiResourceBase<'journey'> {
  progress?: ApiProgress
}

export interface ApiFolder extends ApiResourceBase<'folder'> {
  orderIndex?: unknown
  progress?: ApiProgress
}

export interface ApiTask extends ApiResourceBase<'task'> {
  taskType: null
  state: ApiTaskState
  isVisible: boolean
  orderIndex?: unknown
}

export interface ApiFolderWithTasks extends ApiFolder {
  tasks: ApiTask[]
}

export interface ApiJourneyWithResources extends ApiJourney {
  folders: ApiFolderWithTasks[]
  tasks: ApiTask[]
}

export type ApiResource = ApiJourneyWithResources | ApiFolderWithTasks | ApiTask

export type ResourceResponse = ApiResponse<ApiResource>

export interface ApiRootResourceItems {
  tasks: ApiTask[]
  folders: ApiFolder[]
  journeys: ApiJourney[]
}

export interface RootResourceResponse extends ApiResponse<ApiRootResourceItems> {
  registers: number
}
