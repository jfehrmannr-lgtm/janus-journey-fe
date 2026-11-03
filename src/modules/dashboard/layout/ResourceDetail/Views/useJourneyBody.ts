'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  getDashboardHomeData,
  synchronizeJourneyInRootResources,
  synchronizeJourneyProgress
} from '@/services/dashboardService'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import type { NavigationRootResources } from '@/types/navigation.type'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import useAppUiStore from '@/stores/appUiStore'

export interface JourneyBodyActions {
  bulkDeleteResourcesAction: (journeyId: string, folderIds: string[], taskIds: string[]) => Promise<void>
}

interface UseJourneyBodyProps {
  actions: JourneyBodyActions
  journeyId: string
}

interface BulkDeleteSelection {
  folderIds: string[]
  taskIds: string[]
}

/**
 * Manages the Journey body query, resource selection, and bulk deletion behavior.
 *
 * @param actions - Server Actions used by Journey resource operations.
 * @param journeyId - Journey identifier whose cached tree is displayed.
 * @returns Journey data, selection state, and resource deletion handlers.
 */
const useJourneyBody = ({ actions, journeyId }: UseJourneyBodyProps) => {
  const queryClient = useQueryClient()
  const journeyQueryKey = navigationQueryKeys.resourceTree('journey', journeyId)
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
      actions.bulkDeleteResourcesAction(journeyId, folderIds, taskIds),
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
        const authoritativeJourney = authoritativeRootResources?.journeys.find((item) => item.uid === journeyId)

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

    if (!journey) {
      return
    }

    const selectedResourceIds = new Set(selectedResource)
    const folderIds = journey.folders
      .filter((folder) => selectedResourceIds.has(folder.uid))
      .map((folder) => folder.uid)

    const taskIds = journey.folders
      .filter((folder) => !selectedResourceIds.has(folder.uid))
      .flatMap((folder) => folder.tasks)
      .filter((task) => selectedResourceIds.has(task.uid))
      .map((task) => task.uid)

    if (folderIds.length === 0 && taskIds.length === 0) {
      return
    }

    deleteResourcesMutation.mutate({ folderIds, taskIds })
  }

  return {
    cancelResourceSelection,
    handleBulkDelete,
    isDeletingResources: deleteResourcesMutation.isPending,
    isSelectingResources,
    journey,
    selectedResource,
    toggleSelectedResource
  }
}

export default useJourneyBody
