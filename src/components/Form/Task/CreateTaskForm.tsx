'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { useQueryClient } from '@tanstack/react-query'
import type { ApiFolderWithTasks, ApiJourneyWithResources, ApiTaskState } from '@/types/resource-api.type'

interface CreateTaskFormProps {
  embedded?: boolean
  folderId: string
  folder?: ApiFolderWithTasks
  idPrefix?: string
  journeyId: string
  onCancel?: () => void
}

const taskStates: Array<{ label: string; value: ApiTaskState }> = [
  { label: 'Pending', value: 'pending' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'In pause', value: 'in-pause' },
  { label: 'Completed', value: 'completed' },
  { label: 'Discarded', value: 'discarded' }
]

/**
 * Renders the local-only Task creation form for a hydrated Journey Folder.
 *
 * @param embedded - Whether to render only the fields for FolderItem composition.
 * @param folderId - Folder identifier from the current route.
 * @param folder - Optional Folder fixture used by isolated playground examples.
 * @param idPrefix - Prefix used to keep field identifiers unique in playgrounds.
 * @param journeyId - Journey identifier used to read the hydrated resource tree.
 * @param onCancel - Optional local callback used to close an embedded form.
 * @returns The Task creation form or a missing-Folder state.
 */
const CreateTaskForm = ({
  embedded = false,
  folderId,
  folder: providedFolder,
  idPrefix = 'task',
  journeyId,
  onCancel
}: CreateTaskFormProps) => {
  const queryClient = useQueryClient()
  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )
  const folder = providedFolder ?? journey?.folders.find((currentFolder) => currentFolder.uid === folderId)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [state, setState] = useState<ApiTaskState>('pending')
  const [isVisible, setIsVisible] = useState(true)
  const [hasNameBlurred, setHasNameBlurred] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  if (!folder) {
    return <ResourceNotFound resourceType="folder" />
  }

  const isNameValid = name.trim().length > 0
  const showNameError = (hasSubmitted || hasNameBlurred) && !isNameValid
  const journeyHref = `/dashboard/home/journey/${encodeURIComponent(journeyId)}`
  const nameId = `${idPrefix}-name`
  const descriptionId = `${idPrefix}-description`
  const stateId = `${idPrefix}-state`

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSubmitted(true)
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
              <h2 className="truncate text-lg font-semibold text-text-primary">Create task in {folder.name}</h2>
            </div>
          </div>
        </header>
      )}

      <section className={embedded ? 'space-y-4 px-3 py-4' : 'space-y-5 px-5 py-5'}>
        {!embedded && (
          <div className="rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-text-body">
              <Icon className="text-blue-700" icon="FolderOutlined" />
              <span className="text-text-muted">Folder</span>
              <span className="font-semibold text-text-strong">{folder.name}</span>
            </div>
            <p className="mt-1 pl-6 text-xs text-text-muted">This task will be created inside the selected folder.</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-text-body" htmlFor={nameId}>
              Task name
            </label>
            <input
              aria-describedby={showNameError ? `${nameId}-error` : undefined}
              aria-invalid={showNameError}
              className={`mt-2 h-11 w-full rounded-lg border bg-surface px-3 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:ring-4 focus:ring-focus/10 ${showNameError ? 'border-danger-foreground focus:border-danger-foreground' : 'border-border focus:border-focus'}`}
              id={nameId}
              maxLength={255}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setHasNameBlurred(true)}
              placeholder="e.g. Build the login form"
              value={name}
            />
            {showNameError && (
              <p className="mt-1 text-xs text-danger-foreground" id={`${nameId}-error`}>
                Enter a task name to continue.
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
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add context or a definition of done"
              value={description}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-text-body" htmlFor={stateId}>
                Initial state
              </label>
              <select
                className="mt-2 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none focus:border-focus focus:ring-4 focus:ring-focus/10"
                id={stateId}
                onChange={(event) => setState(event.target.value as ApiTaskState)}
                value={state}
              >
                {taskStates.map((taskState) => (
                  <option key={taskState.value} value={taskState.value}>
                    {taskState.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-end gap-2 pb-2 text-sm text-text-body">
              <input
                checked={isVisible}
                className="size-4 rounded border-border-strong text-primary focus:ring-focus"
                onChange={(event) => setIsVisible(event.target.checked)}
                type="checkbox"
              />
              Visible task
            </label>
          </div>
        </div>

        {!embedded && (
          <div className="rounded-lg border border-dashed border-border-strong bg-surface-subtle px-3 py-2.5 text-xs leading-5 text-text-muted">
            Saving tasks is not available yet. Your entries will remain local to this form.
          </div>
        )}

        {(!embedded || onCancel) && (
          <footer className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
            {embedded ? (
              <Button
                buttonSize="normal"
                color="neutral"
                label="Cancel"
                onClick={onCancel}
                type="button"
                variant="outlined"
              />
            ) : (
              <>
                <Link
                  className="rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-text-body transition-colors hover:bg-surface-subtle"
                  href={journeyHref}
                  scroll={false}
                >
                  Cancel
                </Link>
                <button
                  className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!isNameValid}
                  title="Task persistence is not implemented yet"
                  type="submit"
                >
                  Save unavailable
                </button>
              </>
            )}
          </footer>
        )}
      </section>
    </form>
  )
}

export default CreateTaskForm
