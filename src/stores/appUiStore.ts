'use client'

import { create } from 'zustand'

interface AppUiState {
  isSideNavCollapsed: boolean
  toggleSideNav: () => void
}

/**
 * Stores shared application navigation UI state without storing domain data.
 */
const useAppUiStore = create<AppUiState>((set) => ({
  isSideNavCollapsed: false,
  toggleSideNav: () => set((state) => ({ isSideNavCollapsed: !state.isSideNavCollapsed }))
}))

export default useAppUiStore
