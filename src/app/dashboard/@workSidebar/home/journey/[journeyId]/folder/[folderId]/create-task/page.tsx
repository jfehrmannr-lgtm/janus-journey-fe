import CreateTaskView from '@/layout/WorkSidebar/DetailedJourney/CreateTaskView'

interface JourneyFolderPageCreateTaskProps {
  params: Promise<{
    journeyId: string
    folderId: string
  }>
}

const JourneyFolderPageCreateTask = async ({ params }: JourneyFolderPageCreateTaskProps) => {
  const { journeyId, folderId } = await params

  return <CreateTaskView folderId={folderId} journeyId={journeyId} />
}

export default JourneyFolderPageCreateTask
