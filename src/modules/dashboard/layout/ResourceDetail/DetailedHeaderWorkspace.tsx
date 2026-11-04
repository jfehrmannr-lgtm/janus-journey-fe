'use client'

import type { ApiFolderWithTasks, ApiJourneyWithResources, ApiTask } from '@/types/resource-api.type'
import type { ResourceType } from '@/types/resource.type'
import Icon from '@/components/Icon/Icon'
import JourneyOptions from '@/modules/dashboard/layout/ResourceDetail/Workspace/JourneyOptions/JourneyOptions'
import Dropdown from '@/components/Dropdown/Dropdown'
import {
  initFolderForm,
  initTaskForm,
  useCreateFolderForm,
  useCreateJourneyForm,
  useCreateTaskForm
} from '@/stores/workspaceFromStore'

const defaultFolderBackgroundImage = '/janus_journey_backgrounds/mount-sunrise.png'

interface DetailedHeaderWorkspaceViewProps {
  mode?: 'view'
  resource: ApiJourneyWithResources | ApiFolderWithTasks | ApiTask
  imgUrl?: string
}

interface DetailedHeaderWorkspaceCreateProps {
  mode: 'create'
  resourceType: ResourceType
}

type DetailedHeaderWorkspaceProps = DetailedHeaderWorkspaceViewProps | DetailedHeaderWorkspaceCreateProps

/**
 * Renders the selected resource header and its resource-specific actions.
 *
 * @param props - Selected resource or creation-mode header configuration.
 * @returns The detailed workspace header.
 */
const DetailedHeaderWorkspace = (props: DetailedHeaderWorkspaceProps) => {
  const journeyForm = useCreateJourneyForm((state) => state.createJourneyForm)
  const folderForm = useCreateFolderForm((state) => state.createFolderForm)[0] ?? initFolderForm
  const taskForm = useCreateTaskForm((state) => state.createTaskForm)[0] ?? initTaskForm
  const isCreateMode = props.mode === 'create'
  const resource = isCreateMode ? undefined : props.resource
  const creationForm = isCreateMode
    ? props.resourceType === 'journey'
      ? journeyForm
      : props.resourceType === 'folder'
        ? folderForm
        : taskForm
    : undefined
  const isJourney = isCreateMode ? props.resourceType === 'journey' : resource?.type === 'journey'
  const isTask = isCreateMode ? props.resourceType === 'task' : resource?.type === 'task'
  const creationLabel = isCreateMode
    ? props.resourceType.charAt(0).toUpperCase() + props.resourceType.slice(1)
    : undefined
  const title = isCreateMode ? creationForm?.name || `Create ${creationLabel}` : resource?.name
  const headerDescription = isCreateMode
    ? creationForm?.description ||
      (props.resourceType === 'journey'
        ? 'Define the purpose and structure of a new Journey.'
        : props.resourceType === 'folder'
          ? 'Organize related Tasks into a focused Folder.'
          : 'Capture a Task you want to complete.')
    : resource?.description
  const headerBackgroundImage = isCreateMode
    ? props.resourceType === 'journey'
      ? journeyForm.imgUrl
      : defaultFolderBackgroundImage
    : resource?.type === 'journey'
      ? resource.imgUrl
      : defaultFolderBackgroundImage
  const headerStyle = headerBackgroundImage
    ? {
        backgroundImage: `linear-gradient(to top, rgb(15 23 42 / 0.88), rgb(15 23 42 / 0.15)), url(${headerBackgroundImage})`
      }
    : { backgroundImage: 'linear-gradient(to top, rgb(30 41 59), rgb(71 85 105))' }

  return (
    <header
      className="relative flex min-h-44 flex-col justify-end overflow-hidden bg-cover bg-center px-5 py-5 text-white"
      style={headerStyle}
    >
      {!isCreateMode && resource?.type === 'journey' && (
        <Dropdown
          id="journey-options-id"
          placement="bottom-end"
          width={400}
          trigger={
            <button
              aria-label="More workspace actions"
              className="z-1 absolute right-4 top-4 flex size-8 cursor-pointer items-center justify-center rounded-lg bg-surface-inverse/40 text-lg text-white transition-colors hover:bg-surface-inverse/60"
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
          <Icon icon={isJourney ? 'CompassOutlined' : isTask ? 'CheckSquareOutlined' : 'FolderOutlined'} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-100">
          {headerDescription || 'No description available.'}
        </p>
      </div>
    </header>
  )
}

export default DetailedHeaderWorkspace
