import type { ApiTaskState } from '@/types/resource-api.type'
import type { TaskState } from '@/types/resource.type'

export type CreateJourneyTaskState = TaskState

export interface CreateJourneyTaskDraft {
  clientId: string
  name: string
  description: string
  state: CreateJourneyTaskState
  isVisible: boolean
}

export interface CreateJourneyFolderDraft {
  clientId: string
  name: string
  description: string
  tasks: CreateJourneyTaskDraft[]
}

export interface CreateJourneyFormState {
  name: string
  description: string
  imgUrl: string
  folders: CreateJourneyFolderDraft[]
  tasks: CreateJourneyTaskDraft[]
}

export interface CreateJourneyDraftTaskPayload {
  name: string
  description: string | null
  state: ApiTaskState
  isVisible: boolean
  orderIndex: number
}

export interface CreateJourneyDraftFolderPayload {
  name: string
  description: string | null
  orderIndex: number
  tasks: CreateJourneyDraftTaskPayload[]
}

export interface CreateJourneyPayload {
  name: string
  description: string | null
  imgUrl: string
  metadata?: Record<string, unknown>
}

export interface CreateJourneyComposePayload {
  name: string
  description: string | null
  imgUrl: string
  folders: CreateJourneyDraftFolderPayload[]
  tasks: CreateJourneyDraftTaskPayload[]
}
