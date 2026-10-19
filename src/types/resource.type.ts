export type ResourceType = 'journey' | 'folder' | 'task'

export type TaskState = 'pending' | 'in-progress' | 'in-pause' | 'completed' | 'discarded'

export interface BaseResource<TType extends ResourceType> {
  uid: string
  type: TType
  parentUid: string
  name: string
  description: string
  updatedAt?: string
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
