'use client'

import { useEffect } from 'react'

import type { ApiTask } from '@/types/resource-api.type'
import type { CreateTaskBulkPayload, CreateTaskBulkResponse } from '@/types/task-api.type'

import TaskWorkspaceActions from './TaskWorkspaceActions'
import TaskWorkspaceBody from './TaskWorkspaceBody'
import useTaskWorkspace from './useTaskWorkspace'

interface TaskWorkspaceProps {
  actions: {
    createTaskAction: (payload: CreateTaskBulkPayload) => Promise<CreateTaskBulkResponse>
  }
  journeyId: string
  tasks: ApiTask[]
  returnHref: string
}

/**
 * Composes the root Task workspace and owns its lifecycle cleanup.
 *
 * @param actions - Server Actions used to submit the pending Task batch.
 * @param journeyId - Journey UID used as the parent for created Tasks.
 * @param tasks - Persisted sibling Tasks displayed by the workspace.
 * @param returnHref - Destination used by the return navigation.
 * @returns The Task workspace container.
 */
const TaskWorkspace = ({ actions, journeyId, tasks, returnHref }: TaskWorkspaceProps) => {
  const workspace = useTaskWorkspace({ createTaskAction: actions.createTaskAction, journeyId })
  const { cleanup } = workspace

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup, returnHref])

  return (
    <div>
      <TaskWorkspaceActions
        canSaveChanges={workspace.canSaveChanges}
        isSubmitting={workspace.isSubmitting}
        onSaveChanges={workspace.handleSaveChanges}
        returnHref={returnHref}
      />
      <TaskWorkspaceBody
        activeFormId={workspace.activeFormId}
        canAddTask={workspace.canAddTask}
        createTaskForm={workspace.createTaskForm}
        formErrors={workspace.formErrors}
        formValidity={workspace.formValidity}
        isTaskFormOpen={workspace.isTaskFormOpen}
        onAddTask={workspace.handleAddTask}
        onCancelTask={workspace.handleCancelTask}
        onFormChange={workspace.handleFormChange}
        onRemoveTask={workspace.handleRemoveTask}
        onSelectTask={workspace.handlePendingTaskClick}
        tasks={tasks}
      />
    </div>
  )
}

export default TaskWorkspace
