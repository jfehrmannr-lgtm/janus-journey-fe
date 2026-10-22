import type { CSSProperties, ReactNode } from 'react'

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
export type DropdownSize = CSSProperties['width']
export type DropdownContent = ReactNode | ((close: () => void) => ReactNode)

export interface DropdownProps {
  content: DropdownContent
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
