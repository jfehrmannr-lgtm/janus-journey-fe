import type { CreateFolderBulkItem } from '@/types/folder-api.type'
import type { ApiResponse } from '@/types/api.type'
import type { ApiFolder } from '@/types/resource-api.type'

interface CreateFolderResourceProps {
  createFolderAction: (payload: CreateFolderBulkItem) => Promise<ApiResponse<ApiFolder>>
}

const CreateFolderResource = ({ createFolderAction }: CreateFolderResourceProps) => {
  void createFolderAction

  return <div className="px-5 py-6 text-sm text-text-muted">Folder creation is not available yet.</div>
}

export default CreateFolderResource
