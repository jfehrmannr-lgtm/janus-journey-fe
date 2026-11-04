'use client'

import CreateJourneyForm from '@/modules/dashboard/layout/Form/CreateResourceForm'
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
  const { canSubmit, createJourneyForm, formErrors, isSubmitting, onFormChange, onSubmit, onValidate } =
    useCreateResourcePageContent({ createJourneyAction: actions.createJourneyAction })

  return (
    <CreateJourneyForm
      canSubmit={canSubmit}
      createJourneyForm={createJourneyForm}
      formErrors={formErrors}
      isSubmitting={isSubmitting}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      onValidate={onValidate}
    />
  )
}

export default CreateJourneyResource
