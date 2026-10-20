import JourneyTreeSkeleton from '@/layout/SideNav/JourneyTreeSkeleton'

/**
 * Renders the Folder WorkSidebar loading state during route transitions.
 *
 * @returns The Folder workspace skeleton.
 */
const FolderSidebarLoading = () => {
  return <JourneyTreeSkeleton resourceType="folder" />
}

export default FolderSidebarLoading
