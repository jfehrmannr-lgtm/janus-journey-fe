import ButtonPlayground from './ButtonPlayground/ButtonPlayground'
import type { ComponentPlaygroundRegistration } from './ComponentPlayground.types'
import IconPlayground from './IconPlayground/IconPlayground'
import JourneyCardPlayground from './JourneyCardPlayground/JourneyCardPlayground'

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
  },
  {
    id: 'icon',
    name: 'Icon',
    playground: IconPlayground
  }
]
