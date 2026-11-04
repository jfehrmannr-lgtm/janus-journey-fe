import CreateResourcePageContent from '@/modules/dashboard/layout/ResourceDetail/Workspace/CreateResource/CreateResourcePageContent'
import DetailedWorkspace from '@/modules/dashboard/layout/ResourceDetail/DetailedWorkspace'
import { createTaskAction } from './actions'

/**
 * Renders the Create Task workspace in the Dashboard work-sidebar slot.
 *
 * @returns The creation-mode DetailedWorkspace with the Task placeholder.
 */
const CreateTaskPage = () => {
  return (
    <DetailedWorkspace mode="create">
      <CreateResourcePageContent actions={{ createTaskAction }} resourceType="task" />
    </DetailedWorkspace>
  )
}

export default CreateTaskPage
