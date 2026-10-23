import type { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import backgroundImage from '@/assets/janus-journey-background.png'
import Dropdown from '@/components/Dropdown/Dropdown'
import Icon from '@/components/Icon/Icon'
import JourneyOptions from '@/components/Workspace/JourneyOptions/JourneyOptions'

interface DetailedHeaderWorkspaceProps {
  resource: ApiJourneyWithResources | ApiFolderWithTasks | ApiTask
}

/**
 * Renders the selected resource header and its Journey options trigger.
 *
 * @param resource - Selected Journey, Folder, or Task resource displayed in the workspace.
 * @returns The detailed workspace header.
 */
const DetailedHeaderWorkspace = ({ resource }: DetailedHeaderWorkspaceProps) => {
  const isJourney = resource.type === 'journey'

  return (
    <header
      className="relative flex min-h-44 flex-col justify-end overflow-hidden bg-cover bg-center px-5 py-5 text-white"
      style={{
        backgroundImage: `linear-gradient(to top, rgb(15 23 42 / 0.88), rgb(15 23 42 / 0.15)), url(${backgroundImage.src})`
      }}
    >
      {isJourney ? (
        <div className="absolute right-4 top-4">
          <Dropdown
            content={<JourneyOptions journeyName={resource.name} />}
            placement="bottom-end"
            trigger={
              <div
                aria-label="More workspace actions"
                className="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-surface-inverse/40 text-lg text-white transition-colors hover:bg-surface-inverse/60"
              >
                <Icon icon="EllipsisOutlined" />
              </div>
            }
            width={360}
          />
        </div>
      ) : (
        <button
          aria-label="More workspace actions"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg bg-surface-inverse/40 text-lg text-white transition-colors hover:bg-surface-inverse/60"
          type="button"
        >
          <Icon icon="EllipsisOutlined" />
        </button>
      )}
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
  )
}

export default DetailedHeaderWorkspace
