import FolderPageContent from '@/modules/dashboard/layout/WorkSidebar/DetailedFolder/FolderPageContent'

interface FolderPageProps {
  params: Promise<{ folderId: string }>
}

/**
 * Renders the selected Folder page content in the parallel workspace route.
 *
 * @param params - Route parameters containing the selected Folder identifier.
 * @returns The Folder page content.
 */
const FolderPage = async ({ params }: FolderPageProps) => {
  const { folderId } = await params
  return <FolderPageContent folderId={folderId} />
}

export default FolderPage
