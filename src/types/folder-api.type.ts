import type { ApiFolder, ApiParentReference } from '@/types/resource-api.type'
import type { ApiResponse } from '@/types/api.type'

export interface CreateFolderBulkItem {
  parent: ApiParentReference
  name: string
  description: string | null
}

export type CreateFolderBulkPayload = CreateFolderBulkItem[]
export type CreateFolderBulkResponse = ApiResponse<ApiFolder[]>
