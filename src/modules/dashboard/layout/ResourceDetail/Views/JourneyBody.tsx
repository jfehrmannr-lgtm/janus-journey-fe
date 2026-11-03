'use client'

import { useRouter } from 'next/navigation'

import Button from '@/components/Button/Button'
import CreateResourceButton from '@/components/Button/CreateResourceButton'
import FolderItem from '@/modules/dashboard/layout/ResourceDetail/Items/FolderItem'
import RootTasks from '@/modules/dashboard/layout/ResourceDetail/Items/RootTasks'
import { getResourcePath } from '@/modules/dashboard/utils/dashboardRoutes'
import useJourneyBody, { type JourneyBodyActions } from './useJourneyBody'

interface JourneyBodyProps {
  journeyId: string
  actions: JourneyBodyActions
}

/**
 * Renders Journey resources and composes the Journey body behavior.
 *
 * @param journeyId - Journey identifier whose cached tree is displayed.
 * @param actions - Server Actions used by resource operations.
 * @returns The Journey resource content and selection controls.
 */
const JourneyBody = ({ journeyId, actions }: JourneyBodyProps) => {
  const router = useRouter()
  const {
    cancelResourceSelection,
    handleBulkDelete,
    isDeletingResources,
    isSelectingResources,
    journey,
    selectedResource,
    toggleSelectedResource
  } = useJourneyBody({ actions, journeyId })

  if (!journey || !('folders' in journey)) {
    return <div className="px-5 py-6 text-sm text-text-muted">Invalid Journey resource</div>
  }

  return (
    <div>
      <nav
        aria-label="Journey sections"
        className="flex sticky top-0 bg-white items-center gap-5 border-b border-border px-5 z-20"
      >
        <div className="flex-1 pt-3">
          <div className="border-b-2 border-primary pb-3 text-sm font-semibold text-text-primary inline-block">
            Tasks
          </div>
        </div>
        {isSelectingResources && (
          <div className="flex items-center gap-2 py-2">
            <Button
              buttonSize="normal"
              className="border-transparent text-danger-foreground hover:bg-danger-surface"
              color="danger"
              disabled={isDeletingResources || selectedResource.length === 0}
              label="Delete All"
              onClick={handleBulkDelete}
              size="nm"
              type="button"
              variant="outlined"
            />
            <Button
              buttonSize="normal"
              className="border-transparent text-text-body hover:bg-surface-subtle"
              color="neutral"
              label="Cancel"
              onClick={cancelResourceSelection}
              size="nm"
              type="button"
              variant="outlined"
            />
          </div>
        )}
        {!isSelectingResources && (
          <div className="flex items-center gap-2 py-2">
            <CreateResourceButton
              onClick={() =>
                router.push(`${getResourcePath('journey', journey.uid)}/create-folder`, {
                  scroll: false
                })
              }
              parentResourceType="journey"
              parentUid={journey.uid}
              resourceType="folder"
            />
          </div>
        )}
      </nav>

      <section className="px-2 py-4">
        {!isSelectingResources && <></>}
        <div className={journey.folders.length !== 0 ? 'space-y-3 p-3' : ''}>
          {journey.folders.map((folder) => (
            <FolderItem
              createTaskHref={`${getResourcePath('journey', journeyId)}/folder/${folder.uid}/create-task`}
              folder={folder}
              isSelectingResources={isSelectingResources}
              isSelected={selectedResource.includes(folder.uid)}
              selectedResource={selectedResource}
              key={folder.uid}
              onToggleSelection={() =>
                toggleSelectedResource(
                  folder.uid,
                  folder.tasks.map((task) => task.uid)
                )
              }
              onToggleTaskSelection={toggleSelectedResource}
            />
          ))}
        </div>
        <div className="space-y-3 p-3">
          <RootTasks
            createTaskHref={`${getResourcePath('journey', journey.uid)}/create-task`}
            journeyUid={journey.uid}
            tasks={journey.tasks}
            isSelectingResources={isSelectingResources}
            selectedResource={selectedResource}
            onToggleSelection={toggleSelectedResource}
          />
        </div>
      </section>
    </div>
  )
}

export default JourneyBody
