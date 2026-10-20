import JourneyTreeSkeleton from '@/layout/SideNav/JourneyTreeSkeleton'

/**
 * Renders the Journey WorkSidebar loading state during route transitions.
 *
 * @returns The Journey workspace skeleton.
 */
const JourneySidebarLoading = () => {
  return <JourneyTreeSkeleton resourceType="journey" />
}

export default JourneySidebarLoading
