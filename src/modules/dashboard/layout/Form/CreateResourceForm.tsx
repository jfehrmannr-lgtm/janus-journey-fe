'use client'

import type { ReactNode } from 'react'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import Input from '@/components/Input/Input'
import InputCheck from '@/components/InputCheck/InputCheck'
import SelectOption from '@/components/SelectOption/SelectOption'
import { resourceDescriptionMaxLength, resourceNameMaxLength } from '@/modules/dashboard/utils/createJourneyPayload'
import type { ResourceType } from '@/types/resource.type'
import type {
  FolderFormErrors,
  FolderFormValues,
  JourneyFormErrors,
  JourneyFormValues,
  ResourceFormErrors,
  ResourceFormValues,
  TaskFormErrors,
  TaskFormValues
} from '@/stores/workspaceFromStore'
import CreateJourneyFormSelectImage from './Journey/CreateJourneyFormSelectImage'

interface CreateResourceFormProps {
  canSubmit: boolean
  createResourceForm: ResourceFormValues
  formErrors: ResourceFormErrors
  isSubmitting: boolean
  onFormChange: (form: ResourceFormValues) => void
  onSubmit: () => void
  onValidate: () => void
  resourceType: ResourceType
}

const taskStates: Array<{ icon: ReactNode; label: string; value: TaskFormValues['state'] }> = [
  {
    icon: <Icon className="text-task-pending-foreground!" icon="ClockCircleOutlined" />,
    label: 'Pending',
    value: 'pending'
  },
  {
    icon: <Icon className="text-task-in-progress-foreground!" icon="SyncOutlined" />,
    label: 'In progress',
    value: 'in-progress'
  },
  {
    icon: <Icon className="text-task-in-pause-foreground!" icon="PauseCircleOutlined" />,
    label: 'In pause',
    value: 'in-pause'
  },
  {
    icon: <Icon className="text-task-completed-foreground!" icon="CheckCircleOutlined" />,
    label: 'Completed',
    value: 'completed'
  },
  {
    icon: <Icon className="text-task-discarded-foreground!" icon="CloseCircleOutlined" />,
    label: 'Discarded',
    value: 'discarded'
  }
]

/**
 * Renders shared and resource-specific fields for a root resource creation form.
 *
 * @param canSubmit - Whether the current draft passes validation.
 * @param createResourceForm - Current resource draft values.
 * @param formErrors - Validation errors for the current resource draft.
 * @param isSubmitting - Whether resource creation is in progress.
 * @param onFormChange - Callback invoked when a draft field changes.
 * @param onSubmit - Callback invoked when the form is submitted.
 * @param onValidate - Callback invoked when the form should be validated.
 * @param resourceType - Resource type whose fields and labels should be rendered.
 * @returns The reusable resource creation form.
 */
const CreateResourceForm = ({
  canSubmit,
  createResourceForm,
  formErrors,
  isSubmitting,
  onFormChange,
  onSubmit,
  onValidate,
  resourceType
}: CreateResourceFormProps) => {
  const journeyForm = createResourceForm as JourneyFormValues
  const folderForm = createResourceForm as FolderFormValues
  const taskForm = createResourceForm as TaskFormValues
  const journeyErrors = formErrors as JourneyFormErrors
  const folderErrors = formErrors as FolderFormErrors
  const taskErrors = formErrors as TaskFormErrors
  const isJourney = resourceType === 'journey'
  const isFolder = resourceType === 'folder'
  const resourceLabel = resourceType.charAt(0).toUpperCase() + resourceType.slice(1)
  const form = isJourney ? journeyForm : isFolder ? folderForm : taskForm
  const errors = isJourney ? journeyErrors : isFolder ? folderErrors : taskErrors

  const handleNameChange = (name: string) => {
    if (isJourney) {
      onFormChange({ ...journeyForm, name })
    } else if (isFolder) {
      onFormChange({ ...folderForm, name })
    } else {
      onFormChange({ ...taskForm, name })
    }
  }

  const handleDescriptionChange = (description: string) => {
    if (isJourney) {
      onFormChange({ ...journeyForm, description })
    } else if (isFolder) {
      onFormChange({ ...folderForm, description })
    } else {
      onFormChange({ ...taskForm, description })
    }
  }

  return (
    <form
      className="space-y-6 px-5 py-5"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">New {resourceLabel}</p>
        <h2 className="text-xl font-semibold tracking-tight text-text-primary">
          {isJourney ? 'Shape a path worth following' : `Create a ${resourceType}`}
        </h2>
        <p className="text-sm leading-6 text-text-muted">
          {isJourney
            ? 'Start with a clear purpose. Folders and Tasks can be added after the Journey exists.'
            : `Add a name and description for this ${resourceType}.`}
        </p>
      </div>

      <section
        className="space-y-4 rounded-xl border border-border bg-surface p-4"
        aria-labelledby={`${resourceType}-details-title`}
      >
        <div>
          <h3 className="font-semibold text-text-primary" id={`${resourceType}-details-title`}>
            {resourceLabel} details
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            {isJourney
              ? 'Give this Journey a name and a short description.'
              : `Give this ${resourceType} a name and description.`}
          </p>
        </div>

        {isJourney && <CreateJourneyFormSelectImage />}

        <Input
          id={`create-${resourceType}-name`}
          error={errors.name}
          characterCount={`${form.name.length}/${resourceNameMaxLength}`}
          label={`${resourceLabel} name`}
          name="name"
          maxLength={resourceNameMaxLength}
          onBlur={() => onValidate()}
          onChange={(event) => handleNameChange(event.target.value)}
          placeholder={isJourney ? 'e.g. Learn web development' : `e.g. ${resourceLabel} name`}
          value={form.name}
        />

        <Input
          id={`create-${resourceType}-description`}
          helperText={isJourney ? 'Optional. Describe the outcome or purpose of this Journey.' : undefined}
          characterCount={`${form.description.length}/${resourceDescriptionMaxLength}`}
          error={errors.description}
          label={
            isJourney ? (
              'Description'
            ) : (
              <>
                <span>Description </span>
                <span className="font-normal text-text-muted">(optional)</span>
              </>
            )
          }
          name="description"
          maxLength={resourceDescriptionMaxLength}
          onBlur={() => onValidate()}
          onChange={(event) => handleDescriptionChange(event.target.value)}
          placeholder={isJourney ? 'What do you want to accomplish?' : `Add context for this ${resourceType}`}
          type={isJourney ? 'text-area' : 'textarea'}
          value={form.description}
        />

        {resourceType === 'task' && (
          <div>
            <label className="text-sm font-semibold text-text-body" htmlFor="create-task-state">
              Initial state
            </label>
            <div className="mt-2 flex items-center gap-4">
              <SelectOption
                aria-label="Initial state"
                id="create-task-state"
                isSearchable={false}
                onChange={(event) =>
                  onFormChange({ ...taskForm, state: event.target.value as TaskFormValues['state'] })
                }
                options={taskStates}
                value={taskForm.state}
              />
              <InputCheck
                checked={taskForm.isVisible}
                label="Visible"
                onChange={(event) => onFormChange({ ...taskForm, isVisible: event.target.checked })}
              />
            </div>
          </div>
        )}
      </section>

      <footer className="border-t border-border pt-5">
        <Button disabled={!canSubmit || isSubmitting} label={`Create ${resourceLabel}`} size="full" type="submit" />
        <p className="mt-2 text-center text-xs text-text-muted">
          {isSubmitting
            ? `Creating your ${resourceType}...`
            : isJourney
              ? 'You can add Folders and Tasks after creation.'
              : `You can add details to this ${resourceType} later.`}
        </p>
      </footer>
    </form>
  )
}

export default CreateResourceForm
