import { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import DetailedHeaderWorkspace from './DetailedHeaderWorkspace'
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
  const isJourney = resource.type === 'journey'
  const progress = isJourney ? resource.progress : undefined

  const resolvedTasks = progress ? progress.completed + progress.discarded : 0

  return (
    <div className="min-h-full bg-white">
      <DetailedHeaderWorkspace resource={resource} />

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

      <DetailedWorksapceActions resource={resource}>{children}</DetailedWorksapceActions>
    </div>
  )
}

export default DetailedWorkspace
