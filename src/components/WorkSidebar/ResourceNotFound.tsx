import Icon from '@/components/Icon/Icon'

interface ResourceNotFoundProps {
  resourceType: 'journey' | 'folder'
}

/**
 * Renders the contextual WorkSidebar state for a missing Journey or Folder.
 *
 * @param resourceType - Type of resource that was not found.
 * @returns The missing-resource message.
 */
const ResourceNotFound = ({ resourceType }: ResourceNotFoundProps) => {
  const resourceLabel = resourceType === 'journey' ? 'Journey' : 'Folder'

  return (
    <div className="flex h-full min-h-48 flex-col items-center justify-center px-6 text-center" role="status">
      <Icon className="text-2xl text-text-subtle" icon="SearchOutlined" />
      <h2 className="mt-3 text-sm font-semibold text-text-primary">{resourceLabel} not found</h2>
      <p className="mt-1 max-w-xs text-sm leading-6 text-text-muted">
        This {resourceLabel.toLowerCase()} may have been deleted or is no longer available.
      </p>
    </div>
  )
}

export default ResourceNotFound
