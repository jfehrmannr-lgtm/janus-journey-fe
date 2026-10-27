import JourneyPageContent from '@/modules/dashboard/layout/WorkSidebar/DetailedJourney/JourneyPageContent'
import { bulkDeleteResourcesAction } from './actions'

interface JourneyPageProps {
  params: Promise<{ journeyId: string }>
}

const JourneyPage = async ({ params }: JourneyPageProps) => {
  const { journeyId } = await params

  return <JourneyPageContent actions={{ bulkDeleteResourcesAction: bulkDeleteResourcesAction }} journeyId={journeyId} />
}

export default JourneyPage
