import type { ReactNode } from 'react'

import type { ApiJourneyWithResources, ApiFolderWithTasks, ApiTask } from '@/types/resource-api.type'

import JourneyWorkspaceQuery from './DetailedJourney/JourneyWorkspaceQuery'
import { createTask } from '@/app/dashboard/@workSidebar/home/journey/[journeyId]/folder/[folderId]/create-task/actions'

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
      return <>Folder workspace pending</>

    case 'task':
      return <>Task workspace pending</>

    default:
      return <>Unsupported resource type</>
  }
}

export default DetailedWorkspaceActions
