import { Suspense, type ReactNode } from 'react'
import DetailedWorkspaceSkeleton from '@/modules/dashboard/layout/WorkSidebar/DetailedWorkspaceSkeleton'
import ResourceContent from './ResourceContent'
import { ResourceType } from '@/types/resource.type'

interface ResourceLayoutProps {
  children: ReactNode
  params: Promise<{ resourceId: string; resourceType: string }>
}

const ResourceLayout = async ({ children, params }: ResourceLayoutProps) => {
  const { resourceId, resourceType } = await params
  const resolvedResourceType: ResourceType = resourceType === 'folder' ? 'folder' : 'journey'

  console.debug('params: ', resourceType, resourceId)
  return (
    <Suspense key={resourceId} fallback={<DetailedWorkspaceSkeleton />}>
      <ResourceContent resourceId={resourceId} resourceType={resolvedResourceType}>
        {children}
      </ResourceContent>
    </Suspense>
  )
}

export default ResourceLayout
