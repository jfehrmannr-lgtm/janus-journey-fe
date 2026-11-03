import ResourcePageContent from '@/modules/dashboard/layout/ResourceDetail/ResourcePageContent'
import { bulkDeleteResourcesAction } from './actions'
import type { ResourceType } from '@/types/resource.type'

interface ResourcePageProps {
  params: Promise<{ resourceId: string; resourceType: string }>
}

const ResourcePage = async ({ params }: ResourcePageProps) => {
  const { resourceId, resourceType: rawResourceType } = await params
  const resourceType = rawResourceType as ResourceType

  return (
    <ResourcePageContent actions={{ bulkDeleteResourcesAction }} resourceId={resourceId} resourceType={resourceType} />
  )
}

export default ResourcePage
