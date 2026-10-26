'use client'

import type { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import backgroundImage from '@/assets/janus-journey-background.png'
import Icon from '@/components/Icon/Icon'
import JourneyOptions from '@/components/Workspace/JourneyOptions/JourneyOptions'
import Dropdown from '@/components/Dropdown/Dropdown'
import { useCreateJourneyForm } from '@/stores/workspaceFromStore'

interface DetailedHeaderWorkspaceViewProps {
  mode?: 'view'
  resource: ApiJourneyWithResources | ApiFolderWithTasks | ApiTask
}

interface DetailedHeaderWorkspaceCreateProps {
  mode: 'create'
}

type DetailedHeaderWorkspaceProps = DetailedHeaderWorkspaceViewProps | DetailedHeaderWorkspaceCreateProps

/**
 * Renders the selected resource header and its Journey options trigger.
 *
 * @param props - Selected resource or creation-mode header configuration.
 * @returns The detailed workspace header.
 */
const DetailedHeaderWorkspace = (props: DetailedHeaderWorkspaceProps) => {
  const draftName = useCreateJourneyForm((state) => state.createJourneyForm.name)
  const isCreateMode = props.mode === 'create'
  const resource = isCreateMode ? undefined : props.resource
  const isJourney = isCreateMode || resource?.type === 'journey'
  const title = isCreateMode ? draftName || 'Create Journey' : resource?.name
  const description = isCreateMode ? 'Define the purpose and structure of a new Journey.' : resource?.description

  return (
    <header
      className="relative flex min-h-44 flex-col justify-end overflow-hidden bg-cover bg-center px-5 py-5 text-white"
      style={{
        backgroundImage: `linear-gradient(to top, rgb(15 23 42 / 0.88), rgb(15 23 42 / 0.15)), url(${backgroundImage.src})`
      }}
    >
      {!isCreateMode && resource && (
        <Dropdown
          id="journey-options-id"
          placement="bottom-end"
          width={400}
          trigger={
            <button
              aria-label="More workspace actions"
              className="absolute right-4 top-4 flex size-8 cursor-pointer items-center justify-center rounded-lg bg-surface-inverse/40 text-lg text-white transition-colors hover:bg-surface-inverse/60"
              type="button"
            >
              <Icon icon="EllipsisOutlined" />
            </button>
          }
        >
          <JourneyOptions journeyName={resource.name} />
        </Dropdown>
      )}
      <div className="relative">
        <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-white/15 text-white">
          <Icon icon={isJourney ? 'AppstoreOutlined' : 'FolderOutlined'} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-100">
          {description || 'No description available.'}
        </p>
      </div>
    </header>
  )
}

export default DetailedHeaderWorkspace
