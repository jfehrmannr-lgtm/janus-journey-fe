import type { ApiResponse } from '@/types/api.type'
import type { ApiParentReference, ApiTask, ApiTaskState } from '@/types/resource-api.type'

export interface CreateTaskBulkItem {
  parent: ApiParentReference
  name: string
  description: string | null
  state: ApiTaskState
  isVisible: boolean
}

export type CreateTaskBulkPayload = CreateTaskBulkItem[]
export type CreateTaskBulkResponse = ApiResponse<ApiTask[]>
