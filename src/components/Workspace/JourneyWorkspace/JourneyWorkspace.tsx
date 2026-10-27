'use client'

import CreateJourneyForm from '@/components/Form/Journey/CreateJourneyForm'
import type { CreateJourneyPayload } from '@/types/createJourney'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourney } from '@/types/resource-api.type'
import useJourneyWorkspace from './useJourneyWorkspace'

interface JourneyWorkspaceProps {
  actions: {
    createJourneyAction: (payload: CreateJourneyPayload) => Promise<ApiResponse<ApiJourney>>
  }
}

/**
 * Composes the Create Journey form with its draft and validation coordinator.
 *
 * @param actions - Server Actions used to create the Journey.
 * @returns The coordinated Create Journey form.
 */
const JourneyWorkspace = ({ actions }: JourneyWorkspaceProps) => {
  const { canSubmit, createJourneyForm, formErrors, isSubmitting, onFormChange, onSubmit, onValidate } =
    useJourneyWorkspace({ createJourneyAction: actions.createJourneyAction })

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

export default JourneyWorkspace
