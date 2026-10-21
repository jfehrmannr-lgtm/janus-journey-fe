'use client'

import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { ApiJourneyWithResources } from '@/types/resource-api.type'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

interface CreateTaskViewProps {
  journeyId: string
}

/**
 * Renders the Journey-level Task creation route navigation.
 *
 * @param journeyId - Journey identifier used to build the return destination.
 * @returns A link back to the current Journey.
 */
const CreateTaskView = ({ journeyId }: CreateTaskViewProps) => {
  const queryClient = useQueryClient()

  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )

  const returnHref = `/dashboard/home/journey/${encodeURIComponent(journeyId)}`

  if (!journey) {
    return <ResourceNotFound resourceType="journey" />
  }

  return (
    <Link
      className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
      href={returnHref}
      scroll={false}
    >
      Cancel and return to Journey
    </Link>
  )
}

export default CreateTaskView
