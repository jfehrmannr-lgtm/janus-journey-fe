import JourneyWorkspace from '@/components/Workspace/JourneyWorkspace/JourneyWorkspace'
import DetailedWorkspace from '@/layout/WorkSidebar/DetailedWorkspace'

/**
 * Renders the Create Journey workspace in the Dashboard work-sidebar slot.
 *
 * @returns The creation-mode DetailedWorkspace with its UI-only form.
 */
const CreateJourneyWorkspacePage = () => {
  return (
    <DetailedWorkspace mode="create">
      <JourneyWorkspace />
    </DetailedWorkspace>
  )
}

export default CreateJourneyWorkspacePage
