'use client'

import { useState, type SubmitEvent } from 'react'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'

export interface FolderFormValues {
  name: string
  description: string
}

interface CreateFolderFormProps {
  embedded?: boolean
  idPrefix?: string
  initialValues?: FolderFormValues
  onCancel?: () => void
  onFormChange?: (values: FolderFormValues) => void
  onSubmit?: () => void
  reference?: {
    name: string
    type: 'journey' | 'folder' | 'user'
  }
}

/**
 * Renders the local-only Folder creation form.
 *
 * @param embedded - Whether to render only the fields for workspace composition.
 * @param idPrefix - Prefix used to keep field identifiers unique.
 * @param initialValues - Optional values used to initialize the form.
 * @param onCancel - Optional callback used to close an embedded form.
 * @param onFormChange - Optional debounced callback receiving the complete form values.
 * @param onSubmit - Optional callback invoked after valid submission.
 * @param reference - Optional contextual resource displayed in the form header.
 * @returns The Folder creation form.
 */
const CreateFolderForm = ({
  embedded = false,
  idPrefix = 'folder',
  initialValues,
  onCancel,
  onFormChange,
  onSubmit,
  reference
}: CreateFolderFormProps) => {
  const [name, setName] = useState(() => initialValues?.name ?? '')
  const [description, setDescription] = useState(() => initialValues?.description ?? '')
  const [hasNameBlurred, setHasNameBlurred] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const isNameValid = name.trim().length > 0
  const showNameError = (hasSubmitted || hasNameBlurred) && !isNameValid
  const nameId = `${idPrefix}-name`
  const descriptionId = `${idPrefix}-description`

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
              <Icon icon="FolderOutlined" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">New Folder</p>
              <h2 className="truncate text-lg font-semibold text-text-primary">
                {reference ? `Create folder in ${reference.name}` : 'Create folder'}
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
                  reference.type === 'journey'
                    ? 'AppstoreOutlined'
                    : reference.type === 'user'
                      ? 'TeamOutlined'
                      : 'FolderOutlined'
                }
              />
              <span className="text-text-muted">{reference.type.toUpperCase()}</span>
              <span className="font-semibold text-text-strong">{reference.name}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-text-body" htmlFor={nameId}>
              Folder name
            </label>
            <input
              aria-describedby={showNameError ? `${nameId}-error` : undefined}
              aria-invalid={showNameError}
              className={`mt-2 h-11 w-full rounded-lg border bg-surface px-3 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:ring-4 focus:ring-focus/10 ${showNameError ? 'border-danger-foreground focus:border-danger-foreground' : 'border-border focus:border-focus'}`}
              id={nameId}
              maxLength={255}
              onBlur={() => setHasNameBlurred(true)}
              onChange={(event) => {
                const nextName = event.target.value

                setName(nextName)
                onFormChange?.({ description, name: nextName })
              }}
              placeholder="e.g. HTML and CSS"
              value={name}
            />
            {showNameError && (
              <p className="mt-1 text-xs text-danger-foreground" id={`${nameId}-error`}>
                Enter a folder name to continue.
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-text-body" htmlFor={descriptionId}>
              Description <span className="font-normal text-text-muted">(optional)</span>
            </label>
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10"
              id={descriptionId}
              maxLength={2000}
              onChange={(event) => {
                const nextDescription = event.target.value

                setDescription(nextDescription)
                onFormChange?.({ description: nextDescription, name })
              }}
              placeholder="Add context for this Folder"
              value={description}
            />
          </div>
        </div>
      </section>
    </form>
  )
}

export default CreateFolderForm
