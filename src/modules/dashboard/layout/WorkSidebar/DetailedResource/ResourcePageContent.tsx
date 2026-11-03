'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Button from '@/components/Button/Button'
import CreateResourceButton from '@/components/Button/CreateResourceButton'
import FolderItem from '@/modules/dashboard/layout/Workspace/FolderItem'
import RootTasks from '@/modules/dashboard/layout/Workspace/RootTasks'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import {
  getDashboardHomeData,
  synchronizeJourneyInRootResources,
  synchronizeJourneyProgress
} from '@/services/dashboardService'
import type { NavigationRootResources } from '@/types/navigation.type'
import useAppUiStore from '@/stores/appUiStore'

interface ResourcePageContentProps {
  resourceId: string
  actions: {
    bulkDeleteResourcesAction: (journeyId: string, folderIds: string[], taskIds: string[]) => Promise<void>
  }
}

interface BulkDeleteSelection {
  folderIds: string[]
  taskIds: string[]
}

/**
 * Renders the selected resource's contents and coordinates bulk resource deletion.
 *
 * @param resourceId - Resource identifier whose cached tree is displayed.
 * @param actions - Server Actions used by resource operations.
 * @returns The resource content and selection controls.
 */
const ResourcePageContent = ({ resourceId, actions }: ResourcePageContentProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const journeyQueryKey = navigationQueryKeys.resourceTree('journey', resourceId)
  const isSelectingResources = useAppUiStore((state) => state.isSelectingResources)
  const selectedResource = useAppUiStore((state) => state.selectedResource)
  const cancelResourceSelection = useAppUiStore((state) => state.cancelResourceSelection)
  const toggleSelectedResource = useAppUiStore((state) => state.toggleSelectedResource)

  const { data: journey } = useQuery<ApiJourneyWithResources>({
    enabled: false,
    queryFn: () => {
      const cachedJourney = queryClient.getQueryData<ApiJourneyWithResources>(journeyQueryKey)

      if (!cachedJourney) {
        throw new Error('The Journey resource is not available in the query cache.')
      }

      return cachedJourney
    },
    queryKey: journeyQueryKey
  })

  const deleteResourcesMutation = useMutation({
    mutationFn: ({ folderIds, taskIds }: BulkDeleteSelection) =>
      actions.bulkDeleteResourcesAction(resourceId, folderIds, taskIds),
    onError: (error: unknown, _selection, context) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete resources.', { id: context?.toastId })
      console.error(error)
    },
    onMutate: () => ({ toastId: toast.loading('Deleting resources...') }),
    onSuccess: async (_response, selection, context) => {
      const folderIds = new Set(selection.folderIds)
      const taskIds = new Set(selection.taskIds)

      const updatedJourney = queryClient.setQueryData<ApiJourneyWithResources>(journeyQueryKey, (cachedJourney) => {
        if (!cachedJourney) return cachedJourney

        return synchronizeJourneyProgress({
          ...cachedJourney,
          folders: cachedJourney.folders
            .filter((folder) => !folderIds.has(folder.uid))
            .map((folder) => ({
              ...folder,
              tasks: folder.tasks.filter((task) => !taskIds.has(task.uid))
            })),
          tasks: cachedJourney.tasks.filter((task) => !taskIds.has(task.uid))
        })
      })

      if (updatedJourney) {
        const updatedRootResources = queryClient.setQueryData<NavigationRootResources>(
          navigationQueryKeys.rootResources(),
          (resources) => (resources ? synchronizeJourneyInRootResources(resources, updatedJourney) : resources)
        )

        if (updatedRootResources) {
          queryClient.setQueryData(['dashboard', 'home'], getDashboardHomeData(updatedRootResources))
        }
      }

      // Delete responses do not expose the propagated activity timestamp. Refetch the existing root query to
      // reconcile the authoritative Journey timestamp, then mirror it back into the selected resource cache.
      try {
        await queryClient.refetchQueries({ queryKey: navigationQueryKeys.rootResources(), type: 'all' })
        const authoritativeRootResources = queryClient.getQueryData<NavigationRootResources>(
          navigationQueryKeys.rootResources()
        )
        const authoritativeJourney = authoritativeRootResources?.journeys.find((item) => item.uid === resourceId)

        if (authoritativeRootResources) {
          queryClient.setQueryData(['dashboard', 'home'], getDashboardHomeData(authoritativeRootResources))
        }

        if (authoritativeJourney) {
          queryClient.setQueryData<ApiJourneyWithResources>(journeyQueryKey, (cachedJourney) =>
            cachedJourney
              ? {
                  ...cachedJourney,
                  lastActivityAt: authoritativeJourney.lastActivityAt,
                  progress: authoritativeJourney.progress ?? cachedJourney.progress
                }
              : cachedJourney
          )
        }
      } catch (error: unknown) {
        console.error(error)
      }

      toast.success('Resources deleted successfully.', { id: context?.toastId })
      cancelResourceSelection()
    }
  })

  const handleBulkDelete = () => {
    if (deleteResourcesMutation.isPending || selectedResource.length === 0) {
      return
    }

    const selectedResourceIds = new Set(selectedResource)
    const folderIds =
      journey?.folders.filter((folder) => selectedResourceIds.has(folder.uid)).map((folder) => folder.uid) ?? []
    const selectedFolderIds = new Set(folderIds)
    const taskIds = journey
      ? [
          ...journey.tasks,
          ...journey.folders.flatMap((folder) => (selectedFolderIds.has(folder.uid) ? [] : folder.tasks))
        ]
          .filter((task) => selectedResourceIds.has(task.uid))
          .map((task) => task.uid)
      : []

    if (folderIds.length === 0 && taskIds.length === 0) {
      return
    }

    deleteResourcesMutation.mutate({ folderIds, taskIds })
  }

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
              disabled={deleteResourcesMutation.isPending || selectedResource.length === 0}
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
      </nav>

      <section className="px-2 py-4">
        {!isSelectingResources && <></>}
        <div className={journey.folders.length !== 0 ? 'space-y-3 p-3' : ''}>
          {journey.folders.map((folder) => (
            <FolderItem
              createTaskHref={`/dashboard/home/journey/${resourceId}/folder/${folder.uid}/create-task`}
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
            createTaskHref={`/dashboard/home/journey/${encodeURIComponent(journey.uid)}/create-task`}
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

export default ResourcePageContent
