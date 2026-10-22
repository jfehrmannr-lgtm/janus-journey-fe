import CreateFolderTaskView from '@/layout/WorkSidebar/DetailedJourney/CreateFolderTaskView'
import { createFolderTaskAction } from './actions'

interface JourneyFolderPageCreateTaskProps {
  params: Promise<{
    journeyId: string
    folderId: string
  }>
}

const JourneyFolderPageCreateTask = async ({ params }: JourneyFolderPageCreateTaskProps) => {
  const { journeyId, folderId } = await params

  return (
    <CreateFolderTaskView
      actions={{ createFolderTaskAction: createFolderTaskAction }}
      folderId={folderId}
      journeyId={journeyId}
    />
  )
}

export default JourneyFolderPageCreateTask
