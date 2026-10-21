import CreateFolderView from '@/layout/WorkSidebar/DetailedJourney/CreateFolderView'

interface JourneyPageCreateFolderProps {
  params: Promise<{
    journeyId: string
  }>
}

const JourneyPageCreateFolder = async ({ params }: JourneyPageCreateFolderProps) => {
  const { journeyId } = await params

  return <CreateFolderView journeyId={journeyId} />
}

export default JourneyPageCreateFolder
