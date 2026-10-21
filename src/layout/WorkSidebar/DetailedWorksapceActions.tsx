import type { ReactNode } from 'react'

import type { ApiJourneyWithResources, ApiFolderWithTasks, ApiTask } from '@/types/resource-api.type'

import JourneyWorkspaceQuery from './DetailedJourney/JourneyWorkspaceQuery'

type WorkspaceResource = ApiJourneyWithResources | ApiFolderWithTasks | ApiTask

interface DetailedWorkspaceProps {
  resource: WorkspaceResource
  children: ReactNode
}

const DetailedWorkspaceActions = ({ resource, children }: DetailedWorkspaceProps) => {
  switch (resource.type) {
    case 'journey':
      return <JourneyWorkspaceQuery>{children}</JourneyWorkspaceQuery>

    case 'folder':
      return <div className="px-5 py-6 text-sm text-text-muted">Folder workspace pending</div>

    case 'task':
      return <div className="px-5 py-6 text-sm text-text-muted">Task workspace pending</div>

    default:
      return <div className="px-5 py-6 text-sm text-text-muted">Unsupported resource type</div>
  }
}

export default DetailedWorkspaceActions
