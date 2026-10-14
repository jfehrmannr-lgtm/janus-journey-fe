'use client'

import type { ReactNode } from 'react'

import useJourneyTreeQuery from '@/hooks/useJourneyTreeQuery'
import JourneyTree from '@/layout/SideNav/JourneyTree'
import JourneyTreeSkeleton from '@/layout/SideNav/JourneyTreeSkeleton'
import type { JourneyTreeData, ResourceType } from '@/types/resources'

interface JourneyTreeQueryProps {
  resourceType: ResourceType
  resourceId: string
  children?: (data: JourneyTreeData) => ReactNode
}

/**
 * Loads one selected Journey or Folder tree and preserves the existing Tree states.
 *
 * @param resourceType - Type of the selected resource.
 * @param resourceId - Stable identifier of the selected resource.
 * @param children - Optional renderer for resolved resource content.
 * @returns The Journey tree query boundary.
 */
const JourneyTreeQuery = ({ resourceType, resourceId, children }: JourneyTreeQueryProps) => {
  const { data, error, isLoading } = useJourneyTreeQuery(resourceType, resourceId)

  if (isLoading) {
    return <JourneyTreeSkeleton />
  }

  if (error || !data) {
    return <p className="px-9 py-2 text-xs text-danger-foreground">Unable to load this resource.</p>
  }

  return children ? children(data) : <JourneyTree data={data} />
}

export default JourneyTreeQuery
