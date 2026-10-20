import JourneyPageContent from '@/layout/WorkSidebar/DetailedJourney/JourneyPageContent'

interface JourneyPageProps {
  params: Promise<{ journeyId: string }>
}

const JourneyPage = async ({ params }: JourneyPageProps) => {
  const { journeyId } = await params

  return <JourneyPageContent journeyId={journeyId} />
}

export default JourneyPage
