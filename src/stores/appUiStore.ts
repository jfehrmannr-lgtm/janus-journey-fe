'use client'

import { create } from 'zustand'
import type { ResourceType } from '@/types/resources'

interface AppUiState {
  expandedJourneyUid: string | null
  isSideNavCollapsed: boolean
  selectedResourceType: ResourceType | null
  selectedResourceUid: string | null
  selectedJourneyUid: string | null
  selectResource: (resourceUid: string, resourceType: 'journey' | 'folder') => void
  selectJourney: (journeyUid: string) => void
  toggleSideNav: () => void
}

/**
 * Stores shared application navigation UI state without storing domain data.
 */
const useAppUiStore = create<AppUiState>((set) => ({
  expandedJourneyUid: null,
  isSideNavCollapsed: false,
  selectedResourceType: null,
  selectedResourceUid: null,
  selectedJourneyUid: null,
  selectResource: (resourceUid, resourceType) =>
    set({
      expandedJourneyUid: resourceType === 'journey' ? resourceUid : null,
      selectedJourneyUid: resourceType === 'journey' ? resourceUid : null,
      selectedResourceType: resourceType,
      selectedResourceUid: resourceUid
    }),
  selectJourney: (journeyUid) =>
    set({
      expandedJourneyUid: journeyUid,
      selectedJourneyUid: journeyUid,
      selectedResourceType: 'journey',
      selectedResourceUid: journeyUid
    }),
  toggleSideNav: () => set((state) => ({ isSideNavCollapsed: !state.isSideNavCollapsed }))
}))

export default useAppUiStore
