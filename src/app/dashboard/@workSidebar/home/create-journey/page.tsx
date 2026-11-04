import CreateResourcePageContent from '@/modules/dashboard/layout/ResourceDetail/Workspace/CreateResource/CreateResourcePageContent'
import DetailedWorkspace from '@/modules/dashboard/layout/ResourceDetail/DetailedWorkspace'
import { createJourneyAction } from './actions'

/**
 * Renders the Create Journey workspace in the Dashboard work-sidebar slot.
 *
 * @returns The creation-mode DetailedWorkspace with its Journey form.
 */
const CreateJourneyPage = () => {
  return (
    <DetailedWorkspace mode="create">
      <CreateResourcePageContent actions={{ createJourneyAction }} resourceType="journey" />
    </DetailedWorkspace>
  )
}

export default CreateJourneyPage
