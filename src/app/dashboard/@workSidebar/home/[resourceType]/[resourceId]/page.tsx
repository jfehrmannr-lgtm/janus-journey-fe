import ResourcePageContent from '@/modules/dashboard/layout/ResourceDetail/ResourcePageContent'
import { bulkDeleteResourcesAction } from './actions'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { isResourceType } from '@/types/resource.type'

interface ResourcePageProps {
  params: Promise<{ resourceId: string; resourceType: string }>
}

const ResourcePage = async ({ params }: ResourcePageProps) => {
  const { resourceId, resourceType: rawResourceType } = await params

  if (!isResourceType(rawResourceType)) {
    return <ResourceNotFound resourceType="null" />
  }

  const resourceType = rawResourceType

  return (
    <ResourcePageContent
      journeyActions={{ bulkDeleteResourcesAction }}
      resourceId={resourceId}
      resourceType={resourceType}
    />
  )
}

export default ResourcePage
