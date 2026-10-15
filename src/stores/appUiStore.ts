'use client'

import { create } from 'zustand'
import type { ResourceType } from '@/types/resource.type'

interface AppUiState {
  expandedJourneyUid: string | null
  isWorkSidebarOpen: boolean
  isSideNavCollapsed: boolean
  selectedResourceType: ResourceType | null
  selectedResourceUid: string | null
  selectedJourneyUid: string | null
  selectResource: (resourceUid: string, resourceType: 'journey' | 'folder') => void
  selectJourney: (journeyUid: string) => void
  closeWorkSidebar: () => void
  openWorkSidebar: () => void
  toggleSideNav: () => void
}

/**
 * Stores shared application navigation UI state without storing domain data.
 */
const useAppUiStore = create<AppUiState>((set) => ({
  expandedJourneyUid: null,
  isWorkSidebarOpen: false,
  isSideNavCollapsed: false,
  selectedResourceType: null,
  selectedResourceUid: null,
  selectedJourneyUid: null,
  selectResource: (resourceUid, resourceType) =>
    set({
      expandedJourneyUid: resourceType === 'journey' ? resourceUid : null,
      selectedJourneyUid: resourceType === 'journey' ? resourceUid : null,
      selectedResourceType: resourceType,
      selectedResourceUid: resourceUid,
      isWorkSidebarOpen: true
    }),
  selectJourney: (journeyUid) =>
    set({
      expandedJourneyUid: journeyUid,
      selectedJourneyUid: journeyUid,
      selectedResourceType: 'journey',
      selectedResourceUid: journeyUid,
      isWorkSidebarOpen: true
    }),
  closeWorkSidebar: () => set({ isWorkSidebarOpen: false }),
  openWorkSidebar: () => set({ isWorkSidebarOpen: true }),
  toggleSideNav: () => set((state) => ({ isSideNavCollapsed: !state.isSideNavCollapsed }))
}))

export default useAppUiStore
