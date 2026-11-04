'use client'

import type { ApiResponse } from '@/types/api.type'
import type { ApiTask } from '@/types/resource-api.type'
import type { CreateTaskBulkItem } from '@/types/task-api.type'
import CreateResourceForm from '@/modules/dashboard/layout/Form/CreateResourceForm'
import useCreateResourcePageContent from './useCreateResourcePageContent'

interface CreateTaskResourceProps {
  createTaskAction: (payload: CreateTaskBulkItem) => Promise<ApiResponse<ApiTask>>
}

/**
 * Renders the Task creation form using the shared resource form behavior.
 *
 * @param createTaskAction - Server Action used to create the Task.
 * @returns The Task creation form.
 */
const CreateTaskResource = ({ createTaskAction }: CreateTaskResourceProps) => {
  const { canSubmit, createResourceForm, formErrors, isSubmitting, onFormChange, onSubmit, onValidate } =
    useCreateResourcePageContent({
      actions: { createTaskAction },
      resourceType: 'task'
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
      resourceType="task"
    />
  )
}

export default CreateTaskResource
