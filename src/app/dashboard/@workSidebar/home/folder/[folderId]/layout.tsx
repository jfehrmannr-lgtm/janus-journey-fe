import { Suspense, type ReactNode } from 'react'

import DetailedWorkspaceSkeleton from '@/modules/dashboard/layout/WorkSidebar/DetailedWorkspaceSkeleton'
import FolderContent from './FolderContent'

interface FolderLayoutProps {
  children: ReactNode
  params: Promise<{ folderId: string }>
}

/**
 * Composes the Folder parallel route with the shared loading state.
 *
 * @param children - Folder route content.
 * @param params - Route parameters containing the selected Folder identifier.
 * @returns The Suspense-wrapped Folder workspace.
 */
const FolderLayout = async ({ children, params }: FolderLayoutProps) => {
  const { folderId } = await params

  return (
    <Suspense key={folderId} fallback={<DetailedWorkspaceSkeleton />}>
      <FolderContent folderId={folderId}>{children}</FolderContent>
    </Suspense>
  )
}

export default FolderLayout
