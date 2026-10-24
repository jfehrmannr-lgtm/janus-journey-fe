'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button/Button'
import CreateResourceButton from '@/components/Button/CreateResourceButton'
import FolderItem from '@/components/Workspace/FolderItem'
import RootTasks from '@/components/Workspace/RootTasks'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import useAppUiStore from '@/stores/appUiStore'

interface JourneyPageContentProps {
  journeyId: string
  actions: {
    bulkDeleteResourcesAction: (journeyId: string, resourceIds: string[]) => Promise<void>
  }
}

const JourneyPageContent = ({ journeyId, actions }: JourneyPageContentProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const isSelectingResources = useAppUiStore((state) => state.isSelectingResources)
  const selectedResource = useAppUiStore((state) => state.selectedResource)
  const cancelResourceSelection = useAppUiStore((state) => state.cancelResourceSelection)
  const toggleSelectedResource = useAppUiStore((state) => state.toggleSelectedResource)

  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )

  // El hook debe devolver ApiJourneyWithResources para acceder a folders.
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
              label="Delete All"
              onClick={() => console.debug(selectedResource)}
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
      </nav>

      <section className="space-y-3 px-5 py-4">
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Folders</div>
          {!isSelectingResources && (
            <div className="border-t border-border-subtle px-3 pt-2">
              <CreateResourceButton
                onClick={() =>
                  router.push(`/dashboard/home/journey/${encodeURIComponent(journey.uid)}/create-folder`, {
                    scroll: false
                  })
                }
                parentResourceType="journey"
                parentUid={journey.uid}
                resourceType="folder"
              />
            </div>
          )}
          <div className="space-y-3 p-3">
            {journey.folders.map((folder) => (
              <FolderItem
                createTaskHref={`/dashboard/home/journey/${journeyId}/folder/${folder.uid}/create-task`}
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
        </div>
        <RootTasks
          createTaskHref={`/dashboard/home/journey/${encodeURIComponent(journey.uid)}/create-task`}
          journeyUid={journey.uid}
          tasks={journey.tasks}
          isSelectingResources={isSelectingResources}
          selectedResource={selectedResource}
          onToggleSelection={toggleSelectedResource}
        />
      </section>
    </div>
  )
}

export default JourneyPageContent
