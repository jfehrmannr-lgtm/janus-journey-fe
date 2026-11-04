import type { CreateJourneyPayload } from '@/types/createJourney'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourney } from '@/types/resource-api.type'
import type { ApiFolder, ApiTask } from '@/types/resource-api.type'
import type { CreateFolderBulkItem } from '@/types/folder-api.type'
import type { CreateTaskBulkItem } from '@/types/task-api.type'
import type { ResourceType } from '@/types/resource.type'
import CreateFolderResource from './CreateFolderResource'
import CreateJourneyResource from './CreateJourneyResource'
import CreateTaskResource from './CreateTaskResource'

interface CreateResourcePageContentProps {
  resourceType: ResourceType
  actions?: {
    createJourneyAction?: (payload: CreateJourneyPayload) => Promise<ApiResponse<ApiJourney>>
    createFolderAction?: (payload: CreateFolderBulkItem) => Promise<ApiResponse<ApiFolder>>
    createTaskAction?: (payload: CreateTaskBulkItem) => Promise<ApiResponse<ApiTask>>
  }
}

/**
 * Selects the resource-specific creation workspace.
 *
 * @param resourceType - Resource type being created.
 * @param actions - Server Actions passed to the selected resource component.
 * @returns The selected resource creation workspace or a placeholder view.
 */
const CreateResourcePageContent = ({ resourceType, actions }: CreateResourcePageContentProps) => {
  switch (resourceType) {
    case 'journey':
      if (!actions?.createJourneyAction) {
        return <div className="px-5 py-6 text-sm text-text-muted">Unable to create this resource.</div>
      }

      return <CreateJourneyResource actions={{ createJourneyAction: actions.createJourneyAction }} />

    case 'folder':
      if (!actions?.createFolderAction) {
        return <div className="px-5 py-6 text-sm text-text-muted">Unable to create this resource.</div>
      }

      return <CreateFolderResource createFolderAction={actions.createFolderAction} />

    case 'task':
      if (!actions?.createTaskAction) {
        return <div className="px-5 py-6 text-sm text-text-muted">Unable to create this resource.</div>
      }

      return <CreateTaskResource createTaskAction={actions.createTaskAction} />

    default:
      return <div className="px-5 py-6 text-sm text-text-muted">Unsupported resource type.</div>
  }
}

export default CreateResourcePageContent
