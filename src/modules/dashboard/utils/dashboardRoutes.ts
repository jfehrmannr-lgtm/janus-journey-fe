import { ResourceType } from '@/types/resource.type'

interface SelectedResourceRoute {
  resourceId: string
  resourceType: ResourceType
}

const dashboardHomePath = '/dashboard/home'

const getResourcePath = (resourceType: ResourceType, resourceId: string): string => {
  return `${dashboardHomePath}/${resourceType}/${encodeURIComponent(resourceId)}`
}

const isWorkSidebarOpen = (pathname: string): boolean => {
  return pathname.startsWith('/dashboard/home/')
}

const getSelectedResourceFromPathname = (pathname: string): SelectedResourceRoute | null => {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length !== 4 || segments[0] !== 'dashboard' || segments[1] !== 'home') {
    return null
  }

  const routeResourceType: ResourceType = segments[2] as ResourceType
  const resourceId = segments[3]

  console.debug('routeResourceType', routeResourceType)

  return {
    resourceType: routeResourceType,
    resourceId: decodeURIComponent(resourceId)
  }
}

export { dashboardHomePath, getResourcePath, getSelectedResourceFromPathname, isWorkSidebarOpen }
export type { SelectedResourceRoute }
