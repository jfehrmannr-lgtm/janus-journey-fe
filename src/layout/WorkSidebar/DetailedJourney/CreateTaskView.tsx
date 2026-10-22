'use client'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import TaskWorkspace from '@/components/Workspace/TaskWorkspace/TaskWorkspace'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import type { CreateTaskBulkPayload, CreateTaskBulkResponse } from '@/types/task-api.type'
import { useQueryClient } from '@tanstack/react-query'

interface CreateTaskViewProps {
  journeyId: string
  actions: {
    createTaskAction: (payload: CreateTaskBulkPayload) => Promise<CreateTaskBulkResponse>
  }
}

/**
 * Renders the Journey-level Task creation route navigation.
 *
 * @param journeyId - Journey identifier used to build the return destination.
 * @returns A link back to the current Journey.
 */
const CreateTaskView = ({ actions, journeyId }: CreateTaskViewProps) => {
  const queryClient = useQueryClient()

  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )

  const returnHref = `/dashboard/home/journey/${encodeURIComponent(journeyId)}`

  if (!journey) {
    return <ResourceNotFound resourceType="journey" />
  }

  return <TaskWorkspace actions={actions} journeyId={journeyId} tasks={journey.tasks} returnHref={returnHref} />
}

export default CreateTaskView
