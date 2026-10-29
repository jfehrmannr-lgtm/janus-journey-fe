import type { ApiResponse } from '@/types/api.type'
import type { BaseResource, ResourceType } from '@/types/resource.type'

export type ApiParentType = 'user' | 'journey' | 'folder'
export type ApiTaskState = 'pending' | 'in-progress' | 'completed' | 'in-pause' | 'discarded'

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

export type ApiResourceBase<TType extends ResourceType> = BaseResource<TType>

export interface ApiJourney extends ApiResourceBase<'journey'> {
  imgUrl: string
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
  progress?: ApiProgress
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
