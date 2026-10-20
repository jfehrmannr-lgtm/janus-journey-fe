import { describe, expect, it } from 'vitest'

import { dashboardHomePath, getResourcePath, getSelectedResourceFromPathname } from './dashboardRoutes'

describe('dashboard routes', () => {
  it('builds encoded Journey and Folder resource paths', () => {
    expect(getResourcePath('journey', 'journey one')).toBe('/dashboard/home/journey/journey%20one')
    expect(getResourcePath('folder', 'folder/one')).toBe('/dashboard/home/folder/folder%2Fone')
  })

  it('reads selected resources from contextual paths', () => {
    expect(getSelectedResourceFromPathname('/dashboard/home/journey/journey%20one')).toEqual({
      resourceId: 'journey one',
      resourceType: 'journey'
    })
    expect(getSelectedResourceFromPathname('/dashboard/home/folder/folder-1')).toEqual({
      resourceId: 'folder-1',
      resourceType: 'folder'
    })
  })

  it('returns no selection for non-contextual paths', () => {
    expect(getSelectedResourceFromPathname(dashboardHomePath)).toBeNull()
    expect(getSelectedResourceFromPathname('/dashboard/home/create-journey')).toBeNull()
    expect(getSelectedResourceFromPathname('/dashboard/home/journey')).toBeNull()
  })
})
