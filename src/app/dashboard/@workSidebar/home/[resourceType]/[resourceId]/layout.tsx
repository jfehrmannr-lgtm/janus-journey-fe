import { Suspense, type ReactNode } from 'react'
import DetailedWorkspaceSkeleton from '@/modules/dashboard/layout/ResourceDetail/DetailedWorkspaceSkeleton'
import ResourceContent from './ResourceContent'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { isResourceType } from '@/types/resource.type'

interface ResourceLayoutProps {
  children: ReactNode
  params: Promise<{ resourceId: string; resourceType: string }>
}

const ResourceLayout = async ({ children, params }: ResourceLayoutProps) => {
  const { resourceId, resourceType } = await params

  if (!isResourceType(resourceType)) {
    return <ResourceNotFound resourceType="null" />
  }

  return (
    <Suspense key={resourceId} fallback={<DetailedWorkspaceSkeleton />}>
      <ResourceContent resourceId={resourceId} resourceType={resourceType}>
        {children}
      </ResourceContent>
    </Suspense>
  )
}

export default ResourceLayout
