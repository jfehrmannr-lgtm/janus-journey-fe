import { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import backgroundImage from '@/assets/janus-journey-background.png'
import Icon from '@/components/Icon/Icon'
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

  console.log(JSON.stringify(resource, null, 2))

  return (
    <div className="min-h-full bg-white">
      <header
        className="relative flex min-h-44 flex-col justify-end overflow-hidden bg-cover bg-center px-5 py-5 text-white"
        style={{
          backgroundImage: `linear-gradient(to top, rgb(15 23 42 / 0.88), rgb(15 23 42 / 0.15)), url(${backgroundImage.src})`
        }}
      >
        <button
          aria-label="More workspace actions"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg bg-surface-inverse/40 text-lg text-white transition-colors hover:bg-surface-inverse/60"
          type="button"
        >
          <Icon icon="EllipsisOutlined" />
        </button>
        <div className="relative">
          <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-white/15 text-white">
            <Icon icon={isJourney ? 'AppstoreOutlined' : 'FolderOutlined'} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{resource.name}</h1>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-100">
            {resource.description || 'No description available.'}
          </p>
        </div>
      </header>

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
