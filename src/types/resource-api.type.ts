import type { ApiResponse } from '@/types/api.type'
import type { BaseResource, ResourceProgress, ResourceType } from '@/types/resource.type'

export type ApiParentType = 'user' | 'journey' | 'folder'
export type ApiTaskState = 'pending' | 'in-progress' | 'completed' | 'in-pause' | 'discarded'

export interface ApiParentReference {
  uid: string
  type: ApiParentType
}

export type ApiResourceBase<TType extends ResourceType> = BaseResource<TType>

export interface ApiJourney extends ApiResourceBase<'journey'> {
  imgUrl: string
  progress?: ResourceProgress
}

export interface ApiFolder extends ApiResourceBase<'folder'> {
  orderIndex?: unknown
  progress?: ResourceProgress
}

export interface ApiTask extends ApiResourceBase<'task'> {
  taskType: null
  state: ApiTaskState
  isVisible: boolean
  orderIndex?: unknown
}

export interface ApiFolderWithTasks extends ApiFolder {
  tasks: ApiTask[]
  progress?: ResourceProgress
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
