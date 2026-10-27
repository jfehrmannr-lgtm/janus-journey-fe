import CreateTaskView from '@/modules/dashboard/layout/WorkSidebar/DetailedJourney/CreateTaskView'
import { createTaskAction } from './actions'

interface JourneyPageCreateTaskProps {
  params: Promise<{
    journeyId: string
  }>
}

const JourneyPageCreateTask = async ({ params }: JourneyPageCreateTaskProps) => {
  const { journeyId } = await params

  return <CreateTaskView actions={{ createTaskAction }} journeyId={journeyId} />
}

export default JourneyPageCreateTask
