import CreateFolderTaskView from '@/modules/dashboard/layout/WorkSidebar/DetailedResource/CreateFolderTaskView'
import { createFolderTaskAction } from './actions'

interface ResourceFolderCreateTaskPageProps {
  params: Promise<{
    resourceId: string
    folderId: string
  }>
}

const ResourceFolderCreateTaskPage = async ({ params }: ResourceFolderCreateTaskPageProps) => {
  const { resourceId, folderId } = await params

  return (
    <CreateFolderTaskView
      actions={{ createFolderTaskAction: createFolderTaskAction }}
      folderId={folderId}
      journeyId={resourceId}
    />
  )
}

export default ResourceFolderCreateTaskPage
