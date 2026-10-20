'use client'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'

interface CreateResourceButtonProps {
  parentResourceType: 'journey' | 'folder'
  parentUid: string
  resourceType: 'folder' | 'task'
}

/**
 * Renders a reusable creation entry point with its parent resource context.
 *
 * @param parentResourceType - Type of the resource that will own the new resource.
 * @param parentUid - Stable identifier of the resource that will own the new resource.
 * @param resourceType - Type of resource represented by the creation action.
 * @returns The contextual creation button.
 */
const CreateResourceButton = ({ parentResourceType, parentUid, resourceType }: CreateResourceButtonProps) => {
  const isFolder = resourceType === 'folder'
  const resourceLabel = isFolder ? 'Folder' : 'Task'

  return (
    <Button
      aria-label={`Create ${resourceLabel}`}
      buttonSize="normal"
      className="w-full justify-start border-border-subtle text-text-muted hover:border-primary/50 hover:text-primary"
      data-parent-resource-type={parentResourceType}
      data-parent-uid={parentUid}
      data-resource-type={resourceType}
      color="neutral"
      icon={<Icon icon={isFolder ? 'FolderOutlined' : 'CheckSquareOutlined'} />}
      label={`Create ${resourceLabel}`}
      size="full"
      type="button"
      variant="dotted"
    />
  )
}

export default CreateResourceButton
