interface SelectedResourceRoute {
  resourceId: string
  resourceType: 'journey' | 'folder'
}

const dashboardHomePath = '/dashboard/home'

const getResourcePath = (resourceType: 'journey' | 'folder', resourceId: string): string => {
  const routeSegment = resourceType === 'journey' ? 'resource' : resourceType

  return `${dashboardHomePath}/${routeSegment}/${encodeURIComponent(resourceId)}`
}

const isWorkSidebarOpen = (pathname: string): boolean => {
  return pathname.startsWith('/dashboard/home/')
}

const getSelectedResourceFromPathname = (pathname: string): SelectedResourceRoute | null => {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length !== 4 || segments[0] !== 'dashboard' || segments[1] !== 'home') {
    return null
  }

  const routeResourceType = segments[2]
  const resourceId = segments[3]

  if ((routeResourceType !== 'resource' && routeResourceType !== 'folder') || !resourceId) {
    return null
  }

  return {
    resourceId: decodeURIComponent(resourceId),
    resourceType: routeResourceType === 'resource' ? 'journey' : 'folder'
  }
}

export { dashboardHomePath, getResourcePath, getSelectedResourceFromPathname, isWorkSidebarOpen }
export type { SelectedResourceRoute }
