interface SelectedResourceRoute {
  resourceId: string
  resourceType: 'journey' | 'folder'
}

const dashboardHomePath = '/dashboard/home'

const getResourcePath = (resourceType: 'journey' | 'folder', resourceId: string): string => {
  return `${dashboardHomePath}/${resourceType}/${encodeURIComponent(resourceId)}`
}

const getSelectedResourceFromPathname = (pathname: string): SelectedResourceRoute | null => {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length !== 4 || segments[0] !== 'dashboard' || segments[1] !== 'home') {
    return null
  }

  const resourceType = segments[2]
  const resourceId = segments[3]

  if ((resourceType !== 'journey' && resourceType !== 'folder') || !resourceId) {
    return null
  }

  return {
    resourceId: decodeURIComponent(resourceId),
    resourceType
  }
}

export { dashboardHomePath, getResourcePath, getSelectedResourceFromPathname }
export type { SelectedResourceRoute }
