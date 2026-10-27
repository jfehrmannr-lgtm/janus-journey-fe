'use client'

import { useEffect } from 'react'

import type { CreateFolderBulkPayload, CreateFolderBulkResponse } from '@/types/folder-api.type'
import type { ApiFolder } from '@/types/resource-api.type'

import FolderWorkspaceActions from './FolderWorkspaceActions'
import FolderWorkspaceBody from './FolderWorkspaceBody'
import useFolderWorkspace from './useFolderWorkspace'

interface FolderWorkspaceProps {
  folders: ApiFolder[]
  journeyId: string
  reference?: {
    name: string
    type: 'journey' | 'folder' | 'user'
  }
  returnHref: string
  actions: {
    createFolderAction: (payload: CreateFolderBulkPayload) => Promise<CreateFolderBulkResponse>
  }
}

/**
 * Composes the Folder workspace presentation and owns its lifecycle cleanup.
 *
 * @param actions - Server Actions used to submit the pending Folder batch.
 * @param folders - Sibling Folders already resolved by the parent container.
 * @param journeyId - Journey UID used as the parent for created Folders.
 * @param reference - Optional parent resource displayed in the Folder form.
 * @param returnHref - Destination used by the return navigation.
 * @returns The Folder workspace container.
 */
const FolderWorkspace = ({ actions, folders, journeyId, reference, returnHref }: FolderWorkspaceProps) => {
  const {
    canSaveChanges,
    isSubmitting,
    activeFormId,
    canAddFolder,
    createFolderForm,
    formErrors,
    formValidity,
    isFolderFormOpen,
    handleAddFolder,
    handleCancelFolder,
    handleFormChange,
    handlePendingFolderClick,
    handleRemoveFolder,
    cleanup,
    handleSaveChanges
  } = useFolderWorkspace({
    createFolderAction: actions.createFolderAction,
    journeyId
  })

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup, returnHref])

  return (
    <div>
      <FolderWorkspaceActions
        canSaveChanges={canSaveChanges}
        isSubmitting={isSubmitting}
        onSaveChanges={handleSaveChanges}
        returnHref={returnHref}
      />
      <FolderWorkspaceBody
        activeFormId={activeFormId}
        canAddFolder={canAddFolder}
        createFolderForm={createFolderForm}
        folders={folders}
        formErrors={formErrors}
        formValidity={formValidity}
        isFolderFormOpen={isFolderFormOpen}
        onAddFolder={handleAddFolder}
        onCancelFolder={handleCancelFolder}
        onFormChange={handleFormChange}
        onRemoveFolder={handleRemoveFolder}
        onSelectFolder={handlePendingFolderClick}
        reference={reference}
      />
    </div>
  )
}

export default FolderWorkspace
