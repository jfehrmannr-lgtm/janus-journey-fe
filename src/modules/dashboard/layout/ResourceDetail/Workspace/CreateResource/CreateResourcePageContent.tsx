import type { CreateJourneyPayload } from '@/types/createJourney'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourney } from '@/types/resource-api.type'
import type { ResourceType } from '@/types/resource.type'
import CreateJourneyResource from './CreateJourneyResource'

interface CreateResourcePageContentProps {
  resourceType: ResourceType
  actions: {
    createJourneyAction: (payload: CreateJourneyPayload) => Promise<ApiResponse<ApiJourney>>
  }
}

/**
 * Selects the resource-specific creation workspace.
 *
 * @param resourceType - Resource type being created.
 * @param actions - Server Actions used to create the Journey.
 * @returns The selected resource creation workspace or a placeholder view.
 */
const CreateResourcePageContent = ({ resourceType, actions }: CreateResourcePageContentProps) => {
  switch (resourceType) {
    case 'journey':
      return <CreateJourneyResource actions={actions} />

    case 'folder':
      return <div className="px-5 py-6 text-sm text-text-muted">Folder creation is not available yet.</div>

    case 'task':
      return <div className="px-5 py-6 text-sm text-text-muted">Task creation is not available yet.</div>

    default:
      return <div className="px-5 py-6 text-sm text-text-muted">Unsupported resource type.</div>
  }
}

export default CreateResourcePageContent
