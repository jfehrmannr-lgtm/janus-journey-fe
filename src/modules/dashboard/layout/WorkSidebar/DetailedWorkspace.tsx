'use client'

import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import ProgressBar from '@/components/ProgressBar/ProgressBar'
import type { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import CreateJourneyWorkspaceLifecycle from '@/modules/dashboard/layout/Workspace/CreateJourneyWorkspaceLifecycle'
import DetailedHeaderWorkspace from './DetailedHeaderWorkspace'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { formatProgressPercentage } from '@/modules/dashboard/utils/progress'
import { useCreateJourneyForm } from '@/stores/workspaceFromStore'

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
  const { createJourneyForm } = useCreateJourneyForm()
  const { children } = props
  const isCreateMode = props.mode === 'create'
  const viewResource = isCreateMode ? undefined : props.resource
  const resourceQueryKey =
    viewResource && (viewResource.type === 'journey' || viewResource.type === 'folder')
      ? navigationQueryKeys.resourceTree(viewResource.type, viewResource.uid)
      : (['workspace', 'create'] as const)
  const { data: cachedResource } = useQuery<WorkspaceResource>({
    enabled: false,
    queryFn: () => {
      if (!viewResource) {
        throw new Error('A workspace resource is required.')
      }

      return viewResource
    },
    queryKey: resourceQueryKey
  })

  const resource = cachedResource! ?? viewResource!

  if (isCreateMode) {
    return (
      <CreateJourneyWorkspaceLifecycle>
        <div className="min-h-full bg-white">
          <DetailedHeaderWorkspace mode="create" imgUrl={createJourneyForm.imgUrl} />
          {children}
        </div>
      </CreateJourneyWorkspaceLifecycle>
    )
  }

  const isJourney = resource.type === 'journey'
  const progress = resource.type === 'journey' || resource.type === 'folder' ? resource.progress : undefined

  const resolvedTasks = progress ? progress.completed + progress.discarded : 0

  return (
    <CreateJourneyWorkspaceLifecycle>
      <div className="min-h-full bg-white">
        <DetailedHeaderWorkspace mode="view" resource={resource} />
        {progress && (
          <section
            aria-label={`${isJourney ? 'Journey' : 'Folder'} progress`}
            className="border-b border-border-subtle px-5 py-5"
          >
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <ProgressBar className="flex-1" progress={progress.percentage} showPercent="none" size="md" />
              <span className="whitespace-nowrap">
                {resolvedTasks} / {progress.total} tasks
              </span>
              <span className="font-semibold text-text-body">{formatProgressPercentage(progress.percentage)}%</span>
            </div>
          </section>
        )}
        {children}
      </div>
    </CreateJourneyWorkspaceLifecycle>
  )
}

export default DetailedWorkspace
