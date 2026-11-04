/**
 * Renders the placeholder for deferred Task creation support.
 *
 * @returns The Task creation placeholder.
 */
const CreateTaskResource = ({ createTaskAction }: CreateTaskResourceProps) => {
  void createTaskAction

  return <div className="px-5 py-6 text-sm text-text-muted">Task creation is not available yet.</div>
}

export default CreateTaskResource
import type { ApiResponse } from '@/types/api.type'
import type { ApiTask } from '@/types/resource-api.type'
import type { CreateTaskBulkItem } from '@/types/task-api.type'

interface CreateTaskResourceProps {
  createTaskAction: (payload: CreateTaskBulkItem) => Promise<ApiResponse<ApiTask>>
}
