import { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import DetailedWorksapceActions from './DetailedWorksapceActions'

interface DetailedWorkspaceProps {
  resource: ApiJourneyWithResources | ApiFolderWithTasks | ApiTask
  children: React.ReactNode
}

/**
 * Prefetches one selected resource tree for the contextual WorkSidebar.
 * @returns The hydrated selected-resource content.
 */
const DetailedWorkspace = ({ resource, children }: DetailedWorkspaceProps) => {
  return (
    <>
      {/** Here is the header component */}
      <div>
        This is the header Name: {resource.name}, ID: {resource.uid}, ResourceType: {resource.type}
      </div>
      <DetailedWorksapceActions resource={resource}>{children}</DetailedWorksapceActions>
    </>
  )
}

export default DetailedWorkspace
