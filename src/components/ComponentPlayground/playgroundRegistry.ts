import ButtonPlayground from './ButtonPlayground/ButtonPlayground'
import type { ComponentPlaygroundRegistration } from './ComponentPlayground.types'
import CreateResourceButtonPlayground from './CreateResourceButtonPlayground/CreateResourceButtonPlayground'
import IconPlayground from './IconPlayground/IconPlayground'
import JourneyCardPlayground from './JourneyCardPlayground/JourneyCardPlayground'
import ProgressBarPlayground from './ProgressBarPlayground/ProgressBarPlayground'
import WorkspacePlayground from './WorkspacePlayground/WorkspacePlayground'

export const PLAYGROUND_REGISTRY: ComponentPlaygroundRegistration[] = [
  {
    id: 'button',
    name: 'Button',
    playground: ButtonPlayground
  },
  {
    id: 'create-resource-button',
    name: 'Create Resource Button',
    playground: CreateResourceButtonPlayground
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
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    playground: ProgressBarPlayground
  },
  {
    id: 'workspace-components',
    name: 'Workspace Components',
    playground: WorkspacePlayground
  }
]
