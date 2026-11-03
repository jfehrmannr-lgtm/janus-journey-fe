import { Suspense, type ReactNode } from 'react'
import DetailedWorkspaceSkeleton from '@/modules/dashboard/layout/ResourceDetail/DetailedWorkspaceSkeleton'
import ResourceContent from './ResourceContent'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'

interface ResourceLayoutProps {
  children: ReactNode
  params: Promise<{ resourceId: string; resourceType: string }>
}

const ResourceLayout = async ({ children, params }: ResourceLayoutProps) => {
  const { resourceId, resourceType } = await params

  if (resourceType !== 'journey' && resourceType !== 'folder' && resourceType !== 'task') {
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
