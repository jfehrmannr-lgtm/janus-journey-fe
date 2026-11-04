'use client'

import CreateResourceForm from '@/modules/dashboard/layout/Form/CreateResourceForm'
import type { CreateJourneyPayload } from '@/types/createJourney'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourney } from '@/types/resource-api.type'
import useCreateResourcePageContent from './useCreateResourcePageContent'

interface CreateJourneyResourceProps {
  actions: {
    createJourneyAction: (payload: CreateJourneyPayload) => Promise<ApiResponse<ApiJourney>>
  }
}

/**
 * Renders the Journey creation workspace using the existing Journey form behavior.
 *
 * @param actions - Server Actions used to create the Journey.
 * @returns The Journey creation form.
 */
const CreateJourneyResource = ({ actions }: CreateJourneyResourceProps) => {
  const { canSubmit, createResourceForm, formErrors, isSubmitting, onFormChange, onSubmit, onValidate } =
    useCreateResourcePageContent({
      actions: { createJourneyAction: actions.createJourneyAction },
      resourceType: 'journey'
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
      resourceType="journey"
    />
  )
}

export default CreateJourneyResource
