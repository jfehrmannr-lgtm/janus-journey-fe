import { ApiParentReference } from './resource-api.type'

export type ResourceType = 'journey' | 'folder' | 'task'

export type TaskState = 'pending' | 'in-progress' | 'in-pause' | 'completed' | 'discarded'

export interface BaseResource<TType extends ResourceType> {
  uid: string
  type: TType
  parent: ApiParentReference
  name: string
  description: string | null
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
  lastActivityAt: string
}

export interface ResourceProgress {
  completed: number
  discarded: number
  pending: number
  inProgress: number
  inPause: number
  total: number
}

export interface Journey extends BaseResource<'journey'> {
  imgUrl: string
  progress?: ResourceProgress
}

export interface Folder extends BaseResource<'folder'> {
  orderIndex: number
  progress?: ResourceProgress
}

export interface Task extends BaseResource<'task'> {
  state: TaskState
  isVisible: boolean
  orderIndex: number
}

export type Resource = Journey | Folder | Task
