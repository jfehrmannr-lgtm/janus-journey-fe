'use client'

import useJourneyTreeQuery from '@/hooks/useJourneyTreeQuery'
import JourneyTree from '@/layout/SideNav/JourneyTree'
import JourneyTreeSkeleton from '@/layout/SideNav/JourneyTreeSkeleton'
import type { ResourceType } from '@/types/resources'

interface JourneyTreeQueryProps {
  resourceType: ResourceType
  resourceId: string
}

/**
 * Loads one selected Journey or Folder tree and preserves the existing Tree states.
 *
 * @param resourceType - Type of the selected resource.
 * @param resourceId - Stable identifier of the selected resource.
 * @returns The Journey tree query boundary.
 */
const JourneyTreeQuery = ({ resourceType, resourceId }: JourneyTreeQueryProps) => {
  const { data, error, isLoading } = useJourneyTreeQuery(resourceType, resourceId)

  if (isLoading) {
    return <JourneyTreeSkeleton />
  }

  if (error || !data) {
    return <p className="px-9 py-2 text-xs text-rose-500">Unable to load this resource.</p>
  }

  return <JourneyTree data={data} />
}

export default JourneyTreeQuery
