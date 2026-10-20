'use client'

import JourneyTreeQuery from '@/layout/SideNav/JourneyTreeQuery'
import JourneyWorkspace from '@/layout/WorkSidebar/JourneyWorkspace'

interface SelectedResourceContentProps {
  resourceId: string
  resourceType: 'journey' | 'folder'
}

/**
 * Composes the existing selected-resource Tree inside the generic Work Sidebar.
 *
 * @param resourceId - Stable identifier from the active route.
 * @param resourceType - Selected Journey or Folder route type.
 * @returns The selected resource Tree.
 */
const SelectedResourceContent = ({ resourceId, resourceType }: SelectedResourceContentProps) => {
  return (
    <JourneyTreeQuery resourceId={resourceId} resourceType={resourceType}>
      {(data) => <JourneyWorkspace data={data} />}
    </JourneyTreeQuery>
  )
}

export default SelectedResourceContent
