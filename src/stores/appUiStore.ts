'use client'

import { create } from 'zustand'

interface AppUiState {
  activeDropdownId: string | null
  isSelectingResources: boolean
  isSideNavCollapsed: boolean
  selectedResource: string[]
  cancelResourceSelection: () => void
  closeDropdown: (dropdownId: string) => void
  openDropdown: (dropdownId: string) => void
  startResourceSelection: () => void
  toggleSelectedResource: (resourceId: string, descendantIds?: string[]) => void
  toggleSideNav: () => void
}

/**
 * Stores shared application navigation UI state without storing domain data.
 */
const useAppUiStore = create<AppUiState>((set) => ({
  activeDropdownId: null,
  isSelectingResources: false,
  isSideNavCollapsed: false,
  selectedResource: [],
  cancelResourceSelection: () => set({ isSelectingResources: false, selectedResource: [] }),
  closeDropdown: (dropdownId) =>
    set((state) => (state.activeDropdownId === dropdownId ? { activeDropdownId: null } : state)),
  openDropdown: (dropdownId) => set({ activeDropdownId: dropdownId }),
  startResourceSelection: () => set({ isSelectingResources: true, selectedResource: [] }),
  toggleSelectedResource: (resourceId, descendantIds = []) =>
    set((state) => {
      if (state.selectedResource.includes(resourceId)) {
        return { selectedResource: state.selectedResource.filter((id) => id !== resourceId) }
      }

      const descendantIdSet = new Set(descendantIds)
      return {
        selectedResource: [...state.selectedResource.filter((id) => !descendantIdSet.has(id)), resourceId]
      }
    }),
  toggleSideNav: () => set((state) => ({ isSideNavCollapsed: !state.isSideNavCollapsed }))
}))

export default useAppUiStore
