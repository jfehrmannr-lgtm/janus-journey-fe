'use client'

import { useState, type SubmitEvent } from 'react'
import Icon from '@/components/Icon/Icon'
import Input from '@/components/Input/Input'
import InputCheck from '@/components/InputCheck/InputCheck'
import SelectOption from '@/components/SelectOption/SelectOption'
import type { ApiTaskState } from '@/types/resource-api.type'

export interface TaskFormValues {
  name: string
  description: string
  state: ApiTaskState
  isVisible: boolean
}

interface CreateTaskFormProps {
  embedded?: boolean
  initialValues?: TaskFormValues
  idPrefix?: string
  onCancel?: () => void
  onFormChange?: (values: TaskFormValues) => void
  onSubmit?: () => void
  reference?: {
    name: string
    type: 'journey' | 'folder' | 'user'
  }
}

const taskStates: Array<{ label: string; value: ApiTaskState }> = [
  { label: 'Pending', value: 'pending' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'In pause', value: 'in-pause' },
  { label: 'Completed', value: 'completed' },
  { label: 'Discarded', value: 'discarded' }
]

/**
 * Renders the local-only Task creation form.
 *
 * @param embedded - Whether to render only the fields for FolderItem composition.
 * @param initialValues - Optional values used to initialize the form.
 * @param idPrefix - Prefix used to keep field identifiers unique in playgrounds.
 * @param onCancel - Optional local callback used to close an embedded form.
 * @param onFormChange - Optional debounced callback receiving the complete form values.
 * @param onSubmit - Optional callback invoked after valid submission.
 * @param reference - Optional contextual resource displayed in the form header.
 * @returns The Task creation form.
 */
const CreateTaskForm = ({
  embedded = false,
  initialValues,
  idPrefix = 'task',
  onFormChange,
  onSubmit,
  reference
}: CreateTaskFormProps) => {
  const [name, setName] = useState(() => initialValues?.name ?? '')
  const [description, setDescription] = useState(() => initialValues?.description ?? '')
  const [state, setState] = useState<ApiTaskState>(() => initialValues?.state ?? 'pending')
  const [isVisible, setIsVisible] = useState(() => initialValues?.isVisible ?? true)
  const [hasNameBlurred, setHasNameBlurred] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const isNameValid = name.trim().length > 0
  const showNameError = (hasSubmitted || hasNameBlurred) && !isNameValid
  const nameId = `${idPrefix}-name`
  const descriptionId = `${idPrefix}-description`
  const stateId = `${idPrefix}-state`

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSubmitted(true)
    if (isNameValid) onSubmit?.()
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
      {!embedded && (
        <header className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary-foreground">
              <Icon icon="CheckSquareOutlined" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">New Task</p>
              <h2 className="truncate text-lg font-semibold text-text-primary">
                {reference ? `Create task in ${reference.name}` : 'Create task'}
              </h2>
            </div>
          </div>
        </header>
      )}

      <section className={embedded ? 'space-y-4 px-3 py-4' : 'space-y-5 px-5 py-5'}>
        {reference && (
          <div className="rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-text-body">
              <Icon
                className="text-blue-700"
                icon={
                  reference?.type === 'journey'
                    ? 'AppstoreOutlined'
                    : reference?.type === 'user'
                      ? 'TeamOutlined'
                      : 'FolderOutlined'
                }
              />
              <span className="text-text-muted">{reference?.type.toUpperCase() ?? 'RESOURCE'}</span>
              <span className="font-semibold text-text-strong">{reference?.name ?? 'Selected resource'}</span>
            </div>
            <p className="mt-1 pl-6 text-xs text-text-muted">This task will be created inside the selected resource.</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Input
              className="mt-2"
              error={showNameError ? 'Enter a task name to continue.' : undefined}
              id={nameId}
              label="Task name"
              maxLength={255}
              onChange={(event) => {
                const nextName = event.target.value

                setName(nextName)
                onFormChange?.({ description, isVisible, name: nextName, state })
              }}
              onBlur={() => setHasNameBlurred(true)}
              placeholder="e.g. Build the login form"
              value={name}
            />
          </div>

          <div>
            <Input
              className="mt-2"
              id={descriptionId}
              label={
                <>
                  Description <span className="font-normal text-text-muted">(optional)</span>
                </>
              }
              maxLength={2000}
              onChange={(event) => {
                const nextDescription = event.target.value

                setDescription(nextDescription)
                onFormChange?.({ description: nextDescription, isVisible, name, state })
              }}
              placeholder="Add context or a definition of done"
              type="textarea"
              value={description}
            />
          </div>

          <div className="">
            <label className="text-sm font-semibold text-text-body" htmlFor={stateId}>
              Initial state
            </label>
            <div className="mt-2 flex items-center gap-4">
              <SelectOption
                aria-label="Initial state"
                id={stateId}
                isSearchable={false}
                onChange={(event) => {
                  const nextState = event.target.value as ApiTaskState

                  setState(nextState)
                  onFormChange?.({ description, isVisible, name, state: nextState })
                }}
                options={taskStates}
                value={state}
              />
              <InputCheck
                checked={isVisible}
                label="Visible"
                onChange={(event) => {
                  const nextIsVisible = event.target.checked

                  setIsVisible(nextIsVisible)
                  onFormChange?.({ description, isVisible: nextIsVisible, name, state })
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </form>
  )
}

export default CreateTaskForm
