'use client'

import { create } from 'zustand'

interface AppUiState {
  expandedJourneyUid: string | null
  isSideNavCollapsed: boolean
  selectedJourneyUid: string | null
  selectJourney: (journeyUid: string) => void
  toggleSideNav: () => void
}

/**
 * Stores shared application navigation UI state without storing domain data.
 */
const useAppUiStore = create<AppUiState>((set) => ({
  expandedJourneyUid: null,
  isSideNavCollapsed: false,
  selectedJourneyUid: null,
  selectJourney: (journeyUid) => set({ expandedJourneyUid: journeyUid, selectedJourneyUid: journeyUid }),
  toggleSideNav: () => set((state) => ({ isSideNavCollapsed: !state.isSideNavCollapsed }))
}))

export default useAppUiStore
