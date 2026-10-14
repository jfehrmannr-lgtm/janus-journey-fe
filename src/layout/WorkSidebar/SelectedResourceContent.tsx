'use client'

import JourneyTreeQuery from '@/layout/SideNav/JourneyTreeQuery'
import JourneyWorkspace from '@/layout/WorkSidebar/JourneyWorkspace'
import useAppUiStore from '@/stores/appUiStore'

/**
 * Composes the existing selected-resource Tree inside the generic Work Sidebar.
 *
 * @returns The selected resource Tree, or an empty selection state.
 */
const SelectedResourceContent = () => {
  const selectedResourceType = useAppUiStore((state) => state.selectedResourceType)
  const selectedResourceUid = useAppUiStore((state) => state.selectedResourceUid)

  if (!selectedResourceUid || (selectedResourceType !== 'journey' && selectedResourceType !== 'folder')) {
    return (
      <div className="flex h-full min-h-48 items-center justify-center px-6 text-center">
        <p className="max-w-xs text-sm leading-6 text-text-muted">Select a Journey or Folder to view its work here.</p>
      </div>
    )
  }

  return (
    <JourneyTreeQuery resourceId={selectedResourceUid} resourceType={selectedResourceType}>
      {(data) => <JourneyWorkspace data={data} />}
    </JourneyTreeQuery>
  )
}

export default SelectedResourceContent
