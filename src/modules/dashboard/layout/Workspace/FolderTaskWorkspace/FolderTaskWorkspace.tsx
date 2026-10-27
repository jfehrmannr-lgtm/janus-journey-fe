'use client'

import { useEffect } from 'react'

import type { ApiFolderWithTasks } from '@/types/resource-api.type'
import type { CreateTaskBulkPayload, CreateTaskBulkResponse } from '@/types/task-api.type'

import FolderTaskWorkspaceActions from './FolderTaskWorkspaceActions'
import FolderTaskWorkspaceBody from './FolderTaskWorkspaceBody'
import useFolderTaskWorkspace from './useFolderTaskWorkspace'

interface FolderTaskWorkspaceProps {
  actions: {
    createFolderTaskAction: (payload: CreateTaskBulkPayload) => Promise<CreateTaskBulkResponse>
  }
  folder: ApiFolderWithTasks
  journeyId: string
  returnHref: string
}

/**
 * Composes the Folder Task workspace and owns its lifecycle cleanup.
 *
 * @param actions - Server Actions used to submit the pending Task batch.
 * @param folder - Resolved Folder and its existing Tasks.
 * @param journeyId - Journey UID whose resource tree is updated after creation.
 * @param returnHref - Destination used by the return navigation.
 * @returns The Folder Task workspace container.
 */
const FolderTaskWorkspace = ({ actions, folder, journeyId, returnHref }: FolderTaskWorkspaceProps) => {
  const workspace = useFolderTaskWorkspace({
    createFolderTaskAction: actions.createFolderTaskAction,
    folderId: folder.uid,
    journeyId
  })
  const { cleanup } = workspace

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup, folder.uid, returnHref])

  return (
    <div>
      <FolderTaskWorkspaceActions
        canSaveChanges={workspace.canSaveChanges}
        folderName={folder.name}
        isSubmitting={workspace.isSubmitting}
        onSaveChanges={workspace.handleSaveChanges}
        returnHref={returnHref}
      />
      <FolderTaskWorkspaceBody
        activeFormId={workspace.activeFormId}
        canAddTask={workspace.canAddTask}
        createTaskForm={workspace.createTaskForm}
        folder={folder}
        formErrors={workspace.formErrors}
        formValidity={workspace.formValidity}
        isTaskFormOpen={workspace.isTaskFormOpen}
        onAddTask={workspace.handleAddTask}
        onCancelTask={workspace.handleCancelTask}
        onFormChange={workspace.handleFormChange}
        onRemoveTask={workspace.handleRemoveTask}
        onSelectTask={workspace.handlePendingTaskClick}
      />
    </div>
  )
}

export default FolderTaskWorkspace
