import ResourcePageContent from '@/modules/dashboard/layout/WorkSidebar/DetailedResource/ResourcePageContent'
import { bulkDeleteResourcesAction } from './actions'

interface ResourcePageProps {
  params: Promise<{ resourceId: string }>
}

const ResourcePage = async ({ params }: ResourcePageProps) => {
  const { resourceId } = await params

  return <ResourcePageContent actions={{ bulkDeleteResourcesAction }} resourceId={resourceId} />
}

export default ResourcePage
