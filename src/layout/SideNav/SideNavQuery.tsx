'use client'

import useNavigationResourcesQuery from '@/hooks/useNavigationResourcesQuery'
import SideNav from '@/layout/SideNav/SideNav'
import SideNavSkeleton from '@/layout/SideNav/SideNavSkeleton'

/**
 * Loads root application resources before rendering the persistent SideNav.
 *
 * @returns The SideNav query boundary.
 */
const SideNavQuery = () => {
  const { data, error, isLoading } = useNavigationResourcesQuery()

  if (isLoading) {
    return <SideNavSkeleton />
  }

  if (error || !data) {
    return (
      <aside className="flex min-h-20 items-center border-b border-slate-200 bg-white px-6 text-sm text-slate-500 lg:min-h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
        Unable to load navigation resources.
      </aside>
    )
  }

  return <SideNav resources={data} />
}

export default SideNavQuery
