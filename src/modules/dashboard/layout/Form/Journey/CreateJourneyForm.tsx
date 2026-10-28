'use client'

import Button from '@/components/Button/Button'
import Dropdown from '@/components/Dropdown/Dropdown'
import Input from '@/components/Input/Input'
import type { JourneyFormErrors } from '@/stores/workspaceFromStore'
import { imageOptions } from './imageOptions'
import Icon from '@/components/Icon/Icon'
import CreateJourneyFormSelectImage from './CreateJourneyFormSelectImage'

interface CreateJourneyFormProps {
  canSubmit: boolean
  createJourneyForm: {
    name: string
    description: string
    imgUrl: string
  }
  formErrors: JourneyFormErrors
  onFormChange: (form: { name: string; description: string; imgUrl: string }) => void
  onSubmit: () => void
  onValidate: () => void
  isSubmitting: boolean
}

/**
 * Renders the UI-only Journey creation form for the Create Journey workspace.
 *
 * @param canSubmit - Whether the current draft passes validation.
 * @param createJourneyForm - Current Journey draft values.
 * @param formErrors - Validation errors keyed by Journey field.
 * @param onFormChange - Callback invoked when a draft field changes.
 * @param onSubmit - Callback invoked when the form is submitted.
 * @param onValidate - Callback invoked when the form should be validated.
 * @param isSubmitting - Whether Journey creation is in progress.
 * @returns A Journey creation form surface.
 */
const CreateJourneyForm = ({
  canSubmit,
  createJourneyForm,
  formErrors,
  isSubmitting,
  onFormChange,
  onSubmit,
  onValidate
}: CreateJourneyFormProps) => {
  return (
    <form
      className="space-y-6 px-5 py-5"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">New Journey</p>
        <h2 className="text-xl font-semibold tracking-tight text-text-primary">Shape a path worth following</h2>
        <p className="text-sm leading-6 text-text-muted">
          Start with a clear purpose. Folders and Tasks can be added after the Journey exists.
        </p>
      </div>

      <section
        className="space-y-4 rounded-xl border border-border bg-surface p-4"
        aria-labelledby="journey-details-title"
      >
        <div>
          <h3 className="font-semibold text-text-primary" id="journey-details-title">
            Journey details
          </h3>
          <p className="mt-1 text-sm text-text-muted">Give this Journey a name and a short description.</p>
        </div>
        <CreateJourneyFormSelectImage />
        <Input
          id="create-journey-name"
          error={formErrors.name}
          label="Journey name"
          name="name"
          onBlur={onValidate}
          onChange={(event) => onFormChange({ ...createJourneyForm, name: event.target.value })}
          placeholder="e.g. Learn web development"
          value={createJourneyForm.name}
        />
        <Input
          id="create-journey-description"
          helperText="Optional. Describe the outcome or purpose of this Journey."
          label="Description"
          name="description"
          onBlur={onValidate}
          onChange={(event) => onFormChange({ ...createJourneyForm, description: event.target.value })}
          placeholder="What do you want to accomplish?"
          type="text-area"
          value={createJourneyForm.description}
        />
      </section>

      <footer className="border-t border-border pt-5">
        <Button disabled={!canSubmit || isSubmitting} label="Create Journey" size="full" type="submit" />
        <p className="mt-2 text-center text-xs text-text-muted">
          {isSubmitting ? 'Creating your Journey...' : 'You can add Folders and Tasks after creation.'}
        </p>
      </footer>
    </form>
  )
}

export default CreateJourneyForm
