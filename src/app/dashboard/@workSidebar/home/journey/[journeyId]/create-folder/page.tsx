import CreateFolderView from '@/layout/WorkSidebar/DetailedJourney/CreateFolderView'
import { createFolderAction } from './actions'

interface JourneyPageCreateFolderProps {
  params: Promise<{
    journeyId: string
  }>
}

const JourneyPageCreateFolder = async ({ params }: JourneyPageCreateFolderProps) => {
  const { journeyId } = await params

  return <CreateFolderView actions={{ createFolderAction: createFolderAction }} journeyId={journeyId} />
}

export default JourneyPageCreateFolder
