'use client'

import type { CreateFolderBulkItem } from '@/types/folder-api.type'
import type { ApiResponse } from '@/types/api.type'
import type { ApiFolder } from '@/types/resource-api.type'
import CreateResourceForm from '@/modules/dashboard/layout/Form/CreateResourceForm'
import useCreateResourcePageContent from './useCreateResourcePageContent'

interface CreateFolderResourceProps {
  createFolderAction: (payload: CreateFolderBulkItem) => Promise<ApiResponse<ApiFolder>>
}

/**
 * Renders the Folder creation form using the shared resource form behavior.
 *
 * @param createFolderAction - Server Action used to create the Folder.
 * @returns The Folder creation form.
 */
const CreateFolderResource = ({ createFolderAction }: CreateFolderResourceProps) => {
  const { canSubmit, createResourceForm, formErrors, isSubmitting, onFormChange, onSubmit, onValidate } =
    useCreateResourcePageContent({
      actions: { createFolderAction },
      resourceType: 'folder'
    })

  return (
    <CreateResourceForm
      canSubmit={canSubmit}
      createResourceForm={createResourceForm}
      formErrors={formErrors}
      isSubmitting={isSubmitting}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      onValidate={onValidate}
      resourceType="folder"
    />
  )
}

export default CreateFolderResource
