import SelectedResourceRoute from '@/layout/WorkSidebar/SelectedResourceRoute'

interface FolderSidebarPageProps {
  params: Promise<{ id: string }>
}

const FolderSidebarPage = async ({ params }: FolderSidebarPageProps) => {
  const { id } = await params

  return <SelectedResourceRoute resourceId={id} resourceType="folder" />
}

export default FolderSidebarPage
