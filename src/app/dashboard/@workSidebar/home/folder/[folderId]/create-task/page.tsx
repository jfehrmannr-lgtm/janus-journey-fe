import CreateFolderTaskView from '@/modules/dashboard/layout/WorkSidebar/DetailedJourney/CreateFolderTaskView'
import { createFolderTaskAction } from '@/app/dashboard/@workSidebar/home/journey/[journeyId]/folder/[folderId]/create-task/actions'

interface FolderCreateTaskPageProps {
  params: Promise<{ folderId: string }>
}

/**
 * Renders the existing Folder Task creation workspace for a Folder detail route.
 *
 * @param params - Route parameters containing the selected Folder identifier.
 * @returns The shared Folder Task creation workspace.
 */
const FolderCreateTaskPage = async ({ params }: FolderCreateTaskPageProps) => {
  const { folderId } = await params

  return (
    <CreateFolderTaskView
      actions={{ createFolderTaskAction }}
      folderId={folderId}
      resourceType="folder"
      returnHref={`/dashboard/home/folder/${encodeURIComponent(folderId)}`}
    />
  )
}

export default FolderCreateTaskPage
