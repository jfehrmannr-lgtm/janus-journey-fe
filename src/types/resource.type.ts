import { ApiParentReference } from './resource-api.type'

const resourceTypes = ['journey', 'folder', 'task'] as const

export type ResourceType = (typeof resourceTypes)[number]

const isResourceType = (value: string): value is ResourceType => {
  return resourceTypes.includes(value as ResourceType)
}

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
  total: number
  percentage: number
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

export { isResourceType, resourceTypes }
