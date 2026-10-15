export type ResourceType = 'journey' | 'folder' | 'task'

export type TaskStatus = 'pending' | 'in-progress' | 'in-pause' | 'completed' | 'discarded'

export interface BaseResource<TType extends ResourceType> {
  uid: string
  type: TType
  parentUid: string
  name: string
  description: string
}

export type Journey = BaseResource<'journey'>

export interface Folder extends BaseResource<'folder'> {
  orderIndex: number
}

export interface Task extends BaseResource<'task'> {
  status: TaskStatus
  isVisible: boolean
  orderIndex: number
}

export type Resource = Journey | Folder | Task
