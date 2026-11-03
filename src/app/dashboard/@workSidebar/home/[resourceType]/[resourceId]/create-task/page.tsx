import CreateTaskView from '@/modules/dashboard/layout/ResourceDetail/Views/CreateTaskView'
import { createTaskAction } from './actions'

interface ResourceCreateTaskPageProps {
  params: Promise<{
    resourceId: string
  }>
}

const ResourceCreateTaskPage = async ({ params }: ResourceCreateTaskPageProps) => {
  const { resourceId } = await params

  return <CreateTaskView actions={{ createTaskAction }} journeyId={resourceId} />
}

export default ResourceCreateTaskPage
