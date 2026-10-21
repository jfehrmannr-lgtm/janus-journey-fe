'use client'

import { useState } from 'react'

import ActionButtons from '@/components/Form/ActionButtons'
import CreateFolderForm from '@/components/Form/Folder/CreateFolderForm'
import FolderForm from '@/components/Form/Folder/FolderForm'
import JourneyForm from '@/components/Form/Journey/JourneyForm'
import CreateTaskForm from '@/components/Form/Task/CreateTaskForm'
import TaskForm from '@/components/Form/Task/TaskForm'
import type { CreateJourneyFolderDraft, CreateJourneyTaskDraft } from '@/types/createJourney'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'
import type { Journey } from '@/types/resource.type'
import { createEmptyFolder, createEmptyTask } from '@/utils/createJourneyPayload'

const playgroundJourneyUid = 'forms-playground-journey'

const playgroundFolder: ApiFolderWithTasks = {
  uid: 'forms-playground-folder',
  type: 'folder',
  parent: { uid: playgroundJourneyUid, type: 'journey' },
  name: 'Forms Playground Folder',
  description: 'A Folder fixture for the CreateTaskForm preview.',
  metadata: {},
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  tasks: []
}

const playgroundJourney: Journey = {
  uid: playgroundJourneyUid,
  type: 'journey',
  parentUid: 'forms-playground-user',
  name: 'Forms Playground Journey',
  description: 'A Journey fixture for the JourneyForm preview.'
}

/**
 * Renders previews for every existing component in the Form directory.
 *
 * @returns The Forms component playground section.
 */
const FormsPlayground = () => {
  const [task, setTask] = useState<CreateJourneyTaskDraft>(() => ({
    ...createEmptyTask(),
    name: 'Review the form preview'
  }))
  const [folder, setFolder] = useState<CreateJourneyFolderDraft>(() => ({
    ...createEmptyFolder(),
    name: 'Example Folder'
  }))

  const handleJourneySubmit = async () => ({ payload: playgroundJourney })

  return (
    <div className="space-y-8">
      <section className="space-y-3" aria-labelledby="forms-action-buttons">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="forms-action-buttons">
            ActionButtons
          </h3>
          <p className="text-sm text-text-muted">Reusable form cancellation and submit actions.</p>
        </div>
        <ActionButtons onCancel={() => undefined} primaryLabel="Save preview" />
      </section>

      <section className="space-y-3" aria-labelledby="forms-task-form">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="forms-task-form">
            TaskForm
          </h3>
          <p className="text-sm text-text-muted">Controlled Task editor with local playground state.</p>
        </div>
        <TaskForm onChange={setTask} task={task} />
      </section>

      <section className="space-y-3" aria-labelledby="forms-folder-form">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="forms-folder-form">
            FolderForm
          </h3>
          <p className="text-sm text-text-muted">Controlled Folder editor with nested Task controls.</p>
        </div>
        <FolderForm folder={folder} onChange={setFolder} />
      </section>

      <section className="space-y-3" aria-labelledby="forms-create-task-form">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="forms-create-task-form">
            CreateTaskForm
          </h3>
          <p className="text-sm text-text-muted">Local Task creation form with a provided Folder fixture.</p>
        </div>
        <CreateTaskForm idPrefix="forms-playground-task" reference={{ name: playgroundFolder.name, type: 'folder' }} />
      </section>

      <section className="space-y-3" aria-labelledby="forms-create-folder-form">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="forms-create-folder-form">
            CreateFolderForm
          </h3>
          <p className="text-sm text-text-muted">Local Folder creation form with a parent reference.</p>
        </div>
        <CreateFolderForm
          idPrefix="forms-playground-folder"
          reference={{ name: 'Forms Playground Journey', type: 'journey' }}
        />
      </section>

      <section className="space-y-3" aria-labelledby="forms-journey-form">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="forms-journey-form">
            JourneyForm
          </h3>
          <p className="text-sm text-text-muted">Journey creation form with local-only submit handling.</p>
        </div>
        <JourneyForm onSubmit={handleJourneySubmit} />
      </section>
    </div>
  )
}

export default FormsPlayground
