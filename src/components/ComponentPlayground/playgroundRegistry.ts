import ButtonPlayground from './ButtonPlayground'
import type { ComponentPlaygroundRegistration } from './ComponentPlayground.types'
import JourneyCardPlayground from './JourneyCardPlayground'

export const PLAYGROUND_REGISTRY: ComponentPlaygroundRegistration[] = [
  {
    id: 'button',
    name: 'Button',
    playground: ButtonPlayground
  },
  {
    id: 'journey-card',
    name: 'Journey Card',
    playground: JourneyCardPlayground
  }
]
