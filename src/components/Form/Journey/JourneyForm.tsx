'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import ActionButtons from '@/components/Form/ActionButtons'
import FolderForm from '@/components/Form/Folder/FolderForm'
import TaskForm from '@/components/Form/Task/TaskForm'
import Icon from '@/components/Icon/Icon'
import type { CreateJourneyFormState, CreateJourneyPayload } from '@/types/createJourney'
import {
  buildCreateJourneyPayload,
  createEmptyFolder,
  createEmptyTask,
  createInitialCreateJourneyFormState,
  getCreateJourneyValidationErrors
} from '@/utils/createJourneyPayload'
import { ApiResponse } from '@/types/api.type'
import { Journey } from '@/types/resource.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface JourneyFormProps {
  cancelHref?: string
  onSubmit: (payload: CreateJourneyPayload) => Promise<ApiResponse<Journey>>
}

/**
 * Manages the complete controlled Journey creation draft and composes its resource forms.
 *
 * @param cancelHref - Route to navigate to when the form is cancelled.
 * @returns A Journey form with controlled Folders, nested Tasks, and root Tasks.
 */
const JourneyForm = ({ cancelHref = '/dashboard/home', onSubmit }: JourneyFormProps) => {
  const router = useRouter()
  const [formState, setFormState] = useState<CreateJourneyFormState>(() => createInitialCreateJourneyFormState())
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const queryClient = useQueryClient()
  const createJourneyMutation = useMutation({
    mutationFn: async (payload: CreateJourneyPayload) => {
      const toastId = toast.loading('Creating Journey...')

      try {
        const response = await onSubmit(payload)

        toast.success('Journey created successfully!', { id: toastId })

        return response
      } catch (error) {
        toast.error('Failed to create Journey.', { id: toastId })
        throw error
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['navigation', 'root-resources']
      })

      router.push('/dashboard/home')
    },

    onError: (error) => {
      console.error(error)
    }
  })

  const updateFormState = (update: (currentState: CreateJourneyFormState) => CreateJourneyFormState) => {
    setFormState(update)
    setValidationErrors([])
  }

  const handleClose = () => {
    router.push(cancelHref)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (createJourneyMutation.isPending) return

    const errors = getCreateJourneyValidationErrors(formState)
    setValidationErrors(errors)

    if (errors.length > 0) return

    const payload = buildCreateJourneyPayload(formState)

    createJourneyMutation.mutate(payload)
  }

  return (
    <form className="mt-7 space-y-4" noValidate onSubmit={handleSubmit}>
      {validationErrors.length > 0 && (
        <div
          aria-label="Create Journey validation errors"
          className="rounded-xl border border-danger-border bg-danger-surface px-5 py-4 text-sm text-danger-foreground"
          role="alert"
        >
          <p className="font-semibold">Review the form before creating the Journey.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <section aria-labelledby="journey-details-title" className="rounded-xl border border-border/80 bg-surface p-5">
        <div className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg text-primary-foreground">
            <Icon icon="AppstoreOutlined" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-text-primary" id="journey-details-title">
              Journey details
            </h2>
            <p className="mt-1 text-sm text-text-muted">Give your Journey a name and a description.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-text-strong" htmlFor="journey-name">
            <span>
              Name{' '}
              <span aria-hidden="true" className="text-danger-foreground">
                *
              </span>
            </span>
            <input
              aria-required="true"
              className="h-11 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10"
              id="journey-name"
              maxLength={255}
              onChange={(event) => updateFormState((currentState) => ({ ...currentState, name: event.target.value }))}
              placeholder="e.g. Learn web development"
              required
              value={formState.name}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-text-strong" htmlFor="journey-description">
            Description
            <textarea
              className="min-h-24 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10"
              id="journey-description"
              onChange={(event) =>
                updateFormState((currentState) => ({ ...currentState, description: event.target.value }))
              }
              placeholder="Describe what this Journey will help you accomplish."
              value={formState.description}
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="journey-folders-title" className="rounded-xl border border-border/80 bg-surface p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg text-emerald-600">
              <Icon icon="FolderOutlined" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-text-primary" id="journey-folders-title">
                Folders
              </h2>
              <p className="mt-1 text-sm text-text-muted">Group related Tasks under a Folder.</p>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-3 py-2 text-sm font-semibold text-text-body transition-colors hover:bg-surface-subtle focus:outline-none focus:ring-4 focus:ring-focus/20"
            onClick={() =>
              updateFormState((currentState) => ({
                ...currentState,
                folders: [...currentState.folders, createEmptyFolder()]
              }))
            }
            type="button"
          >
            <Icon icon="PlusOutlined" />
            Add Folder
          </button>
        </div>
        {formState.folders.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-border-strong px-4 py-7 text-center">
            <p className="text-sm font-semibold text-text-body">No Folders added yet.</p>
            <p className="mt-1 text-xs text-text-muted">Add a Folder to start organizing Tasks.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {formState.folders.map((folder, folderIndex) => (
              <FolderForm
                folder={folder}
                folderIndex={folderIndex}
                key={folder.clientId}
                onChange={(updatedFolder) =>
                  updateFormState((currentState) => ({
                    ...currentState,
                    folders: currentState.folders.map((currentFolder) =>
                      currentFolder.clientId === updatedFolder.clientId ? updatedFolder : currentFolder
                    )
                  }))
                }
                onRemove={() =>
                  updateFormState((currentState) => ({
                    ...currentState,
                    folders: currentState.folders.filter((currentFolder) => currentFolder.clientId !== folder.clientId)
                  }))
                }
              />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="journey-root-tasks-title" className="rounded-xl border border-border/80 bg-surface p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-600">
              <Icon icon="CheckCircleOutlined" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-text-primary" id="journey-root-tasks-title">
                Journey Tasks
              </h2>
              <p className="mt-1 text-sm text-text-muted">Add Tasks directly under this Journey.</p>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-3 py-2 text-sm font-semibold text-text-body transition-colors hover:bg-surface-subtle focus:outline-none focus:ring-4 focus:ring-focus/20"
            onClick={() =>
              updateFormState((currentState) => ({
                ...currentState,
                tasks: [...currentState.tasks, createEmptyTask()]
              }))
            }
            type="button"
          >
            <Icon icon="PlusOutlined" />
            Add Task
          </button>
        </div>
        {formState.tasks.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-border-strong px-4 py-7 text-center">
            <p className="text-sm font-semibold text-text-body">No Tasks added yet.</p>
            <p className="mt-1 text-xs text-text-muted">Add a Task to track key actions for this Journey.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {formState.tasks.map((task, taskIndex) => (
              <TaskForm
                key={task.clientId}
                label={`Task ${taskIndex + 1}`}
                onChange={(updatedTask) =>
                  updateFormState((currentState) => ({
                    ...currentState,
                    tasks: currentState.tasks.map((currentTask) =>
                      currentTask.clientId === updatedTask.clientId ? updatedTask : currentTask
                    )
                  }))
                }
                onRemove={() =>
                  updateFormState((currentState) => ({
                    ...currentState,
                    tasks: currentState.tasks.filter((currentTask) => currentTask.clientId !== task.clientId)
                  }))
                }
                removeLabel={`Remove root Task ${taskIndex + 1}`}
                task={task}
              />
            ))}
          </div>
        )}
      </section>

      <ActionButtons
        disableSubmitAction={createJourneyMutation.isPending}
        onCancel={handleClose}
        primaryLabel="Create Journey"
      />
    </form>
  )
}

export default JourneyForm
