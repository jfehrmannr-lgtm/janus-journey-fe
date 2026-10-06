'use client'

import { create } from 'zustand'

interface JanusAuthState {
  isAuthenticated: boolean
  isError: boolean
  isLoading: boolean
  isProvisioning: boolean
  setState: (state: JanusAuthFlags) => void
}

export interface JanusAuthFlags {
  isAuthenticated: boolean
  isError: boolean
  isLoading: boolean
  isProvisioning: boolean
}

const useJanusAuthStore = create<JanusAuthState>((set) => ({
  isAuthenticated: false,
  isError: false,
  isLoading: true,
  isProvisioning: false,
  setState: (state) => set(state)
}))

export default useJanusAuthStore
