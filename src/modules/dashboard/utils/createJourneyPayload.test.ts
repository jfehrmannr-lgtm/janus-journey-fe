import { describe, expect, it } from 'vitest'

import { buildCreateJourneyPayload, getCreateJourneyValidationErrors } from './createJourneyPayload'
import type { CreateJourneyFormState } from '@/types/createJourney'

const createFormState = (): CreateJourneyFormState => ({
  name: 'Learn web development',
  description: 'A structured learning path.',
  imgUrl: '/janus_journey_backgrounds/mount-sunrise.png',
  folders: [
    {
      clientId: 'folder-client-1',
      name: 'HTML and CSS',
      description: 'Frontend foundations.',
      tasks: [
        {
          clientId: 'task-client-1',
          name: 'Learn semantic HTML',
          description: 'Study semantic elements.',
          state: 'completed',
          isVisible: true
        }
      ]
    }
  ],
  tasks: [
    {
      clientId: 'task-client-2',
      name: 'Choose a learning schedule',
      description: '',
      state: 'pending',
      isVisible: true
    }
  ]
})

describe('buildCreateJourneyPayload', () => {
  it('creates a parentless hierarchy with Folder correlation identifiers', () => {
    expect(buildCreateJourneyPayload(createFormState())).toEqual({
      name: 'Learn web development',
      description: 'A structured learning path.',
      imgUrl: '/janus_journey_backgrounds/mount-sunrise.png',
      folders: [
        {
          name: 'HTML and CSS',
          clientId: 'folder-client-1',
          description: 'Frontend foundations.',
          orderIndex: 0,
          tasks: [
            {
              name: 'Learn semantic HTML',
              description: 'Study semantic elements.',
              state: 'completed',
              isVisible: true,
              orderIndex: 0
            }
          ]
        }
      ],
      tasks: [
        {
          name: 'Choose a learning schedule',
          description: null,
          state: 'pending',
          isVisible: true,
          orderIndex: 0
        }
      ]
    })
  })
})

describe('getCreateJourneyValidationErrors', () => {
  it('requires valid names for the Journey, Folders, and Tasks', () => {
    const formState = createFormState()
    formState.name = ''
    formState.folders[0].name = ''
    formState.folders[0].tasks[0].name = ''
    formState.tasks[0].name = ''

    expect(getCreateJourneyValidationErrors(formState)).toEqual([
      'Journey name is required and must be between 1 and 255 characters.',
      'Folder 1 needs a name between 1 and 255 characters.',
      'Task 1 in Folder 1 needs a name between 1 and 255 characters.',
      'Root Task 1 needs a name between 1 and 255 characters.'
    ])
  })
})
