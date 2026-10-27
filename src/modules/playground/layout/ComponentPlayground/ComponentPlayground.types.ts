import type { ComponentType } from 'react'

export interface ComponentPlaygroundRegistration {
  id: string
  name: string
  playground: ComponentType
}
