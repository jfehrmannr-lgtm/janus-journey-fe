'use client'

import { useState } from 'react'

import Button from '@/components/Button/Button'
import CreateTaskForm from '@/components/Form/Task/CreateTaskForm'
import Icon from '@/components/Icon/Icon'
import FolderItem from '@/components/Workspace/FolderItem'
import RootTasks from '@/components/Workspace/RootTasks'
import TaskItem from '@/components/Workspace/TaskItem'
import type { ApiFolderWithTasks, ApiTask } from '@/types/resource-api.type'

const journeyUid = 'playground-journey'

const taskStateLabels: Record<ApiTask['state'], string> = {
  pending: 'Pending',
  'in-progress': 'In progress',
  completed: 'Completed',
  'in-pause': 'In pause',
  discarded: 'Discarded'
}

/**
 * Creates a complete mock task for the isolated workspace examples.
 *
 * @param uid - Stable mock task identifier.
 * @param name - Mock task display name.
 * @param state - State represented by the task row.
 * @returns A task-shaped playground fixture.
 */
const createTask = (uid: string, name: string, state: ApiTask['state']): ApiTask => ({
  uid,
  type: 'task',
  parent: { uid: journeyUid, type: 'journey' },
  name,
  description: null,
  metadata: {},
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  taskType: null,
  state,
  isVisible: true
})

const populatedFolder: ApiFolderWithTasks = {
  uid: 'playground-frontend',
  type: 'folder',
  parent: { uid: journeyUid, type: 'journey' },
  name: 'Frontend',
  description: 'Frontend learning tasks',
  metadata: {},
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  tasks: [
    createTask('task-react', 'Learn React', 'pending'),
    createTask('task-typescript', 'Practice TypeScript', 'in-progress'),
    createTask('task-accessibility', 'Review accessibility', 'completed')
  ]
}

const emptyFolder: ApiFolderWithTasks = {
  ...populatedFolder,
  uid: 'playground-empty',
  name: 'Empty Folder',
  tasks: []
}

const rootTasks = [
  createTask('task-plan', 'Plan the next sprint', 'pending'),
  createTask('task-retrospective', 'Write retrospective notes', 'in-pause'),
  createTask('task-archive', 'Archive old notes', 'discarded')
]

/**
 * Demonstrates the isolated workspace folder and task components with mock data.
 *
 * @returns A visual playground for FolderItem, RootTasks, and TaskItem.
 */
const WorkspacePlayground = () => {
  const [isPopulatedFormOpen, setIsPopulatedFormOpen] = useState(false)
  const [isEmptyFormOpen, setIsEmptyFormOpen] = useState(false)

  return (
    <div className="space-y-8">
      <section className="space-y-3" aria-labelledby="workspace-folder-examples">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="workspace-folder-examples">
            FolderItem
          </h3>
          <p className="text-sm text-text-muted">Populated and empty folder states.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <FolderItem folder={populatedFolder} />
          <FolderItem folder={emptyFolder} />
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="workspace-create-task">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="workspace-create-task">
            CreateTaskForm
          </h3>
          <p className="text-sm text-text-muted">Standalone and contextual Folder compositions.</p>
        </div>
        <CreateTaskForm
          folder={populatedFolder}
          folderId={populatedFolder.uid}
          idPrefix="standalone-task"
          journeyId={journeyUid}
        />
        <div className="grid gap-4 xl:grid-cols-2">
          <FolderItem folder={populatedFolder} showCompletionProgress={false} showCreateTaskAction={false}>
            <div className="border-t border-border-subtle px-3 py-2">
              <Button
                buttonSize="normal"
                color="neutral"
                icon={<Icon icon="PlusOutlined" />}
                label="Add Task"
                onClick={() => setIsPopulatedFormOpen((current) => !current)}
                size="full"
                type="button"
                variant="dotted"
              />
            </div>
            {isPopulatedFormOpen && (
              <CreateTaskForm
                embedded
                folder={populatedFolder}
                folderId={populatedFolder.uid}
                idPrefix="populated-embedded-task"
                journeyId={journeyUid}
                onCancel={() => setIsPopulatedFormOpen(false)}
              />
            )}
          </FolderItem>
          <FolderItem folder={emptyFolder} showCompletionProgress={false} showCreateTaskAction={false}>
            <div className="border-t border-border-subtle px-3 py-2">
              <Button
                buttonSize="normal"
                color="neutral"
                icon={<Icon icon="PlusOutlined" />}
                label="Add Task"
                onClick={() => setIsEmptyFormOpen((current) => !current)}
                size="full"
                type="button"
                variant="dotted"
              />
            </div>
            {isEmptyFormOpen && (
              <CreateTaskForm
                embedded
                folder={emptyFolder}
                folderId={emptyFolder.uid}
                idPrefix="empty-embedded-task"
                journeyId={journeyUid}
                onCancel={() => setIsEmptyFormOpen(false)}
              />
            )}
          </FolderItem>
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="workspace-root-tasks">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="workspace-root-tasks">
            RootTasks
          </h3>
          <p className="text-sm text-text-muted">Tasks belonging directly to the Journey.</p>
        </div>
        <RootTasks journeyUid={journeyUid} tasks={rootTasks} />
      </section>

      <section className="space-y-3" aria-labelledby="workspace-task-states">
        <div>
          <h3 className="text-lg font-semibold text-text-primary" id="workspace-task-states">
            TaskItem states
          </h3>
          <p className="text-sm text-text-muted">Individual task rows across supported states.</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          {(['pending', 'in-progress', 'completed', 'in-pause', 'discarded'] as const).map((state) => (
            <TaskItem key={state} task={createTask(`state-${state}`, taskStateLabels[state], state)} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default WorkspacePlayground
