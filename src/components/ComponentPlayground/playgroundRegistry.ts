import ButtonPlayground from './ButtonPlayground/ButtonPlayground'
import type { ComponentPlaygroundRegistration } from './ComponentPlayground.types'
import CreateResourceButtonPlayground from './CreateResourceButtonPlayground/CreateResourceButtonPlayground'
import FormsPlayground from './FormsPlayground/FormsPlayground'
import IconPlayground from './IconPlayground/IconPlayground'
import InputCheckPlayground from './InputCheckPlayground/InputCheckPlayground'
import InputPlayground from './InputPlayground/InputPlayground'
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
    id: 'forms',
    name: 'Forms',
    playground: FormsPlayground
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
    id: 'input',
    name: 'Inputs',
    playground: InputPlayground
  },
  {
    id: 'input-check',
    name: 'Input Check',
    playground: InputCheckPlayground
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
