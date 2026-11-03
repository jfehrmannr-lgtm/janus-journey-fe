import FolderBody from './Views/FolderBody'
import JourneyBody from './Views/JourneyBody'
import type { ResourceType } from '@/types/resource.type'

interface ResourcePageContentProps {
  resourceId: string
  resourceType: ResourceType
  actions: {
    bulkDeleteResourcesAction: (journeyId: string, folderIds: string[], taskIds: string[]) => Promise<void>
  }
}

/**
 * Selects the body for the requested resource type.
 *
 * @param resourceId - Identifier of the selected resource.
 * @param resourceType - Type of the selected resource.
 * @param actions - Server Actions used by the selected resource body.
 * @returns The resource-specific body or an unsupported-resource message.
 */
const ResourcePageContent = ({ resourceId, resourceType, actions }: ResourcePageContentProps) => {
  switch (resourceType) {
    case 'journey':
      return <JourneyBody actions={actions} journeyId={resourceId} />

    case 'folder':
      return <FolderBody folderId={resourceId} />
    case 'task':
      return <div className="px-5 py-6 text-sm text-text-muted">This resource type is not available yet. TASK</div>

    default:
      return <div className="px-5 py-6 text-sm text-text-muted">Unsupported resource type.</div>
  }
}

export default ResourcePageContent
