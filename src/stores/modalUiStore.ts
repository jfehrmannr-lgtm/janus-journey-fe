'use client'

import { create } from 'zustand'

export type ModalType = 'create' | 'update' | 'delete'

interface ModalUiState {
  showModal: boolean
  typeModal: ModalType | null
  setShowModal: (open: boolean) => void
  setTypeModal: (type: ModalType | null) => void
}

/**
 * Stores shared modal visibility and operation type UI state.
 */
const useModalUiStore = create<ModalUiState>((set) => ({
  showModal: false,
  typeModal: null,
  setShowModal: (open) => set({ showModal: open }),
  setTypeModal: (type) => set({ typeModal: type })
}))

export default useModalUiStore
