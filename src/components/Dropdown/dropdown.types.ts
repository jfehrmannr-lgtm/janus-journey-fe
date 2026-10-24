import type { ReactNode } from 'react'

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownProps {
  id: string
  trigger: ReactNode
  children: ReactNode
  onClose?: () => void
  placement?: DropdownPlacement
  width?: number | 'trigger'
  maxHeight?: number
}
