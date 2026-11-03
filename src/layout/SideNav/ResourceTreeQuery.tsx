'use client'

import type { ReactNode } from 'react'

import useResourceTreeQuery from '@/hooks/useResourceTreeQuery'
import JourneyTree from '@/layout/SideNav/JourneyTree'
import JourneyTreeSkeleton from '@/layout/SideNav/JourneyTreeSkeleton'
import type { JourneyTreeData } from '@/types/navigation.type'

interface ResourceTreeQueryProps {
  resourceType: 'journey' | 'folder'
  resourceId: string
  children?: (data: JourneyTreeData) => ReactNode
}

/**
 * Loads one selected resource tree and preserves the existing Tree states.
 *
 * @param resourceType - Type of the selected resource.
 * @param resourceId - Stable identifier of the selected resource.
 * @param children - Optional renderer for resolved resource content.
 * @returns The resource tree query boundary.
 */
const ResourceTreeQuery = ({ resourceType, resourceId, children }: ResourceTreeQueryProps) => {
  const { data, error, isLoading } = useResourceTreeQuery(resourceType, resourceId)

  if (isLoading) {
    return <JourneyTreeSkeleton resourceType={resourceType} />
  }

  if (error || !data) {
    return <p className="px-9 py-2 text-xs text-danger-foreground">Unable to load this resource.</p>
  }

  return children ? children(data) : <JourneyTree data={data} />
}

export default ResourceTreeQuery
