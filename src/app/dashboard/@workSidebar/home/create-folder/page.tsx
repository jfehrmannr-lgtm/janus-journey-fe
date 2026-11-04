import CreateResourcePageContent from '@/modules/dashboard/layout/ResourceDetail/Workspace/CreateResource/CreateResourcePageContent'
import DetailedWorkspace from '@/modules/dashboard/layout/ResourceDetail/DetailedWorkspace'
import { createFolderAction } from './actions'

/**
 * Renders the Create Folder workspace in the Dashboard work-sidebar slot.
 *
 * @returns The creation-mode DetailedWorkspace with the Folder placeholder.
 */
const CreateFolderPage = () => {
  return (
    <DetailedWorkspace mode="create" resourceType="folder">
      <CreateResourcePageContent actions={{ createFolderAction }} resourceType="folder" />
    </DetailedWorkspace>
  )
}

export default CreateFolderPage
