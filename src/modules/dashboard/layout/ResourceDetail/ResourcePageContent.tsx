import FolderBody from './Views/FolderBody'
import JourneyBody from './Views/JourneyBody'
import type { JourneyBodyActions } from './Views/useJourneyBody'
import type { ResourceType } from '@/types/resource.type'

interface ResourcePageContentProps {
  resourceId: string
  resourceType: ResourceType
  journeyActions: JourneyBodyActions
}

/**
 * Selects the body for the requested resource type.
 *
 * @param resourceId - Identifier of the selected resource.
 * @param resourceType - Type of the selected resource.
 * @param journeyActions - Server Actions used by the Journey body.
 * @returns The resource-specific body or an unsupported-resource message.
 */
const ResourcePageContent = ({ resourceId, resourceType, journeyActions }: ResourcePageContentProps) => {
  switch (resourceType) {
    case 'journey':
      return <JourneyBody actions={journeyActions} journeyId={resourceId} />

    case 'folder':
      return <FolderBody folderId={resourceId} />
    case 'task':
      return <div className="px-5 py-6 text-sm text-text-muted">This resource type is not available yet. TASK</div>

    default:
      return <div className="px-5 py-6 text-sm text-text-muted">Unsupported resource type.</div>
  }
}

export default ResourcePageContent
