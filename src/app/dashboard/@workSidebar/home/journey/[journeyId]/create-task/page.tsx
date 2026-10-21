import CreateTaskView from '@/layout/WorkSidebar/DetailedJourney/CreateTaskView'

interface JourneyPageCreateTaskProps {
  params: Promise<{
    journeyId: string
  }>
}

const JourneyPageCreateTask = async ({ params }: JourneyPageCreateTaskProps) => {
  const { journeyId } = await params

  return <CreateTaskView journeyId={journeyId} />
}

export default JourneyPageCreateTask
