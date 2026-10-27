import type { ReactNode } from 'react'

import type { ApiJourneyWithResources, ApiFolderWithTasks, ApiTask } from '@/types/resource-api.type'

import JourneyWorkspaceQuery from './DetailedJourney/JourneyWorkspaceQuery'

type WorkspaceResource = ApiJourneyWithResources | ApiFolderWithTasks | ApiTask

interface DetailedWorkspaceViewProps {
  mode?: 'view'
  resource: WorkspaceResource
  children: ReactNode
}

interface DetailedWorkspaceCreateProps {
  mode: 'create'
  children: ReactNode
}

type DetailedWorkspaceActionsProps = DetailedWorkspaceViewProps | DetailedWorkspaceCreateProps

/**
 * Renders the content/actions area for the selected workspace mode.
 *
 * @param props - Workspace mode, resource when viewing, and composed content.
 * @returns The mode-specific workspace content area.
 */
const DetailedWorkspaceActions = (props: DetailedWorkspaceActionsProps) => {
  if (props.mode === 'create') {
    return <>{props.children}</>
  }

  const { resource, children } = props

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
