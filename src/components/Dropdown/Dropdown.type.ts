import type { CSSProperties, ReactNode } from 'react'

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
export type DropdownSize = CSSProperties['width']
export type DropdownContent = ReactNode | ((close: () => void, dropdownId: string) => ReactNode)

export interface DropdownProps {
  content: DropdownContent
  id?: string
  maxHeight?: CSSProperties['maxHeight']
  placement?: DropdownPlacement
  trigger: ReactNode
  width?: DropdownSize
}

export interface DropdownPosition {
  left: number
  top: number
}

export interface DropdownPositioningInput {
  dropdownHeight: number
  dropdownWidth: number
  placement: DropdownPlacement
  triggerRect: DOMRect
  viewportHeight: number
  viewportWidth: number
}
