import CreateFolderView from '@/modules/dashboard/layout/ResourceDetail/Views/CreateFolderView'
import { createFolderAction } from './actions'

interface ResourceCreateFolderPageProps {
  params: Promise<{
    resourceId: string
  }>
}

const ResourceCreateFolderPage = async ({ params }: ResourceCreateFolderPageProps) => {
  const { resourceId } = await params

  return <CreateFolderView actions={{ createFolderAction }} journeyId={resourceId} />
}

export default ResourceCreateFolderPage
