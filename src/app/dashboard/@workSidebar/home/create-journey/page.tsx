import JourneyWorkspace from '@/modules/dashboard/layout/Workspace/JourneyWorkspace/JourneyWorkspace'
import DetailedWorkspace from '@/modules/dashboard/layout/WorkSidebar/DetailedWorkspace'
import { createJourneyAction } from './actions'

/**
 * Renders the Create Journey workspace in the Dashboard work-sidebar slot.
 *
 * @returns The creation-mode DetailedWorkspace with its Journey form.
 */
const CreateJourneyWorkspacePage = () => {
  return (
    <DetailedWorkspace mode="create">
      <JourneyWorkspace actions={{ createJourneyAction }} />
    </DetailedWorkspace>
  )
}

export default CreateJourneyWorkspacePage
