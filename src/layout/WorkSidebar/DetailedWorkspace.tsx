import type { ReactNode } from 'react'

import type { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import CreateJourneyWorkspaceLifecycle from '@/components/Workspace/CreateJourneyWorkspaceLifecycle'
import DetailedHeaderWorkspace from './DetailedHeaderWorkspace'
import DetailedWorksapceActions from './DetailedWorksapceActions'

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

type DetailedWorkspaceProps = DetailedWorkspaceViewProps | DetailedWorkspaceCreateProps

/**
 * Renders the shared workspace shell in view or resource-creation mode.
 *
 * @param props - Workspace mode, resource when viewing, and composed content.
 * @returns The workspace shell with its header and content/actions area.
 */
const DetailedWorkspace = (props: DetailedWorkspaceProps) => {
  const { children } = props

  if (props.mode === 'create') {
    return (
      <CreateJourneyWorkspaceLifecycle>
        <div className="min-h-full bg-white">
          <DetailedHeaderWorkspace mode="create" />
          <DetailedWorksapceActions mode="create">{children}</DetailedWorksapceActions>
        </div>
      </CreateJourneyWorkspaceLifecycle>
    )
  }

  const { resource } = props
  const isJourney = resource.type === 'journey'
  const progress = isJourney ? resource.progress : undefined

  const resolvedTasks = progress ? progress.completed + progress.discarded : 0

  return (
    <div className="min-h-full bg-white">
      <DetailedHeaderWorkspace mode="view" resource={resource} />

      {isJourney && progress && (
        <section aria-label="Journey progress" className="border-b border-border-subtle px-5 py-5">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={progress.percentage}
            >
              <div className="h-full rounded-full bg-slate-600" style={{ width: `${progress.percentage}%` }} />
            </div>
            <span className="whitespace-nowrap">
              {resolvedTasks} / {progress.total} tasks
            </span>
            <span className="font-semibold text-text-body">{progress.percentage}%</span>
          </div>
        </section>
      )}

      <DetailedWorksapceActions mode="view" resource={resource}>
        {children}
      </DetailedWorksapceActions>
    </div>
  )
}

export default DetailedWorkspace
