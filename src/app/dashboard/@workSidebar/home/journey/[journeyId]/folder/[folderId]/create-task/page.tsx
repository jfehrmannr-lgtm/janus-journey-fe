import CreateFolderTaskView from '@/layout/WorkSidebar/DetailedJourney/CreateFolderTaskView'

interface JourneyFolderPageCreateTaskProps {
  params: Promise<{
    journeyId: string
    folderId: string
  }>
}

const JourneyFolderPageCreateTask = async ({ params }: JourneyFolderPageCreateTaskProps) => {
  const { journeyId, folderId } = await params

  return <CreateFolderTaskView folderId={folderId} journeyId={journeyId} />
}

export default JourneyFolderPageCreateTask
