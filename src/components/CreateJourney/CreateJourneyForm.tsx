'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

import Icon from '@/components/Icon/Icon'
import useModalUiStore from '@/stores/modalUiStore'
import type { CreateJourneyFormState, CreateJourneyTaskState } from '@/types/createJourney'
import {
  buildCreateJourneyPayload,
  createEmptyFolder,
  createEmptyTask,
  createInitialCreateJourneyFormState,
  getCreateJourneyValidationErrors
} from '@/utils/createJourneyPayload'

const taskStates: CreateJourneyTaskState[] = ['pending', 'in-progress', 'in-pause', 'completed', 'discarded']

/**
 * Renders the local Create Journey hierarchy form.
 *
 * @returns A Journey form with editable Folders, nested Tasks, and root Tasks.
 */
const CreateJourneyForm = () => {
  const setShowModal = useModalUiStore((state) => state.setShowModal)
  const setTypeModal = useModalUiStore((state) => state.setTypeModal)
  const [formState, setFormState] = useState<CreateJourneyFormState>(() => createInitialCreateJourneyFormState())
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleClose = () => {
    setShowModal(false)
    setTypeModal(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const errors = getCreateJourneyValidationErrors(formState)
    setValidationErrors(errors)

    if (errors.length > 0) {
      return
    }

    console.log('Create Journey draft payload:', buildCreateJourneyPayload(formState))
  }

  const updateFormState = (update: (currentState: CreateJourneyFormState) => CreateJourneyFormState) => {
    setFormState(update)
    setValidationErrors([])
  }

  return (
    <form className="space-y-6 p-6" noValidate onSubmit={handleSubmit}>
      {validationErrors.length > 0 && (
        <div
          aria-label="Create Journey validation errors"
          className="rounded-xl border border-danger-border bg-danger-surface px-4 py-3 text-sm text-danger-foreground"
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

      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-text-strong" htmlFor="journey-name">
          Journey name
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

      <section aria-labelledby="journey-folders-title" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-text-primary" id="journey-folders-title">
              Folders
            </h3>
            <p className="mt-1 text-sm text-text-muted">Group related Tasks under a Folder.</p>
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
          <p className="rounded-xl border border-dashed border-border-strong px-4 py-5 text-center text-sm text-text-muted">
            No Folders added yet.
          </p>
        ) : (
          <div className="space-y-4">
            {formState.folders.map((folder, folderIndex) => (
              <section
                className="rounded-xl border border-border-subtle bg-surface-subtle/60 p-4"
                key={folder.clientId}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-primary-foreground" icon="FolderOutlined" />
                  <h4 className="min-w-0 flex-1 text-sm font-semibold text-text-strong">Folder {folderIndex + 1}</h4>
                  <button
                    aria-label={`Remove Folder ${folderIndex + 1}`}
                    className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-danger-surface hover:text-danger-foreground focus:outline-none focus:ring-4 focus:ring-focus/20"
                    onClick={() =>
                      updateFormState((currentState) => ({
                        ...currentState,
                        folders: currentState.folders.filter(
                          (currentFolder) => currentFolder.clientId !== folder.clientId
                        )
                      }))
                    }
                    type="button"
                  >
                    <Icon icon="CloseOutlined" />
                  </button>
                </div>

                <div className="mt-4 grid gap-4">
                  <label
                    className="grid gap-2 text-sm font-medium text-text-strong"
                    htmlFor={`folder-name-${folder.clientId}`}
                  >
                    Folder name
                    <input
                      className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10"
                      id={`folder-name-${folder.clientId}`}
                      maxLength={255}
                      onChange={(event) =>
                        updateFormState((currentState) => ({
                          ...currentState,
                          folders: currentState.folders.map((currentFolder) =>
                            currentFolder.clientId === folder.clientId
                              ? { ...currentFolder, name: event.target.value }
                              : currentFolder
                          )
                        }))
                      }
                      placeholder="e.g. HTML and CSS"
                      value={folder.name}
                    />
                  </label>
                  <label
                    className="grid gap-2 text-sm font-medium text-text-strong"
                    htmlFor={`folder-description-${folder.clientId}`}
                  >
                    Folder description
                    <textarea
                      className="min-h-20 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10"
                      id={`folder-description-${folder.clientId}`}
                      onChange={(event) =>
                        updateFormState((currentState) => ({
                          ...currentState,
                          folders: currentState.folders.map((currentFolder) =>
                            currentFolder.clientId === folder.clientId
                              ? { ...currentFolder, description: event.target.value }
                              : currentFolder
                          )
                        }))
                      }
                      placeholder="Optional Folder description"
                      value={folder.description}
                    />
                  </label>
                </div>

                <div className="mt-5 space-y-3 border-t border-border-subtle pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <h5 className="text-sm font-semibold text-text-strong">Tasks</h5>
                    <button
                      className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-soft focus:outline-none focus:ring-4 focus:ring-focus/20"
                      onClick={() =>
                        updateFormState((currentState) => ({
                          ...currentState,
                          folders: currentState.folders.map((currentFolder) =>
                            currentFolder.clientId === folder.clientId
                              ? { ...currentFolder, tasks: [...currentFolder.tasks, createEmptyTask()] }
                              : currentFolder
                          )
                        }))
                      }
                      type="button"
                    >
                      <Icon icon="PlusOutlined" />
                      Add Task
                    </button>
                  </div>
                  {folder.tasks.map((task, taskIndex) => (
                    <div className="rounded-lg border border-border-subtle bg-surface p-3" key={task.clientId}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Task {taskIndex + 1}
                        </span>
                        <button
                          aria-label={`Remove Task ${taskIndex + 1} from Folder ${folderIndex + 1}`}
                          className="flex size-7 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-danger-surface hover:text-danger-foreground focus:outline-none focus:ring-4 focus:ring-focus/20"
                          onClick={() =>
                            updateFormState((currentState) => ({
                              ...currentState,
                              folders: currentState.folders.map((currentFolder) =>
                                currentFolder.clientId === folder.clientId
                                  ? {
                                      ...currentFolder,
                                      tasks: currentFolder.tasks.filter(
                                        (currentTask) => currentTask.clientId !== task.clientId
                                      )
                                    }
                                  : currentFolder
                              )
                            }))
                          }
                          type="button"
                        >
                          <Icon icon="CloseOutlined" />
                        </button>
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <input
                          aria-label={`Task ${taskIndex + 1} name`}
                          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10 sm:col-span-2"
                          maxLength={255}
                          onChange={(event) =>
                            updateFormState((currentState) => ({
                              ...currentState,
                              folders: currentState.folders.map((currentFolder) =>
                                currentFolder.clientId === folder.clientId
                                  ? {
                                      ...currentFolder,
                                      tasks: currentFolder.tasks.map((currentTask) =>
                                        currentTask.clientId === task.clientId
                                          ? { ...currentTask, name: event.target.value }
                                          : currentTask
                                      )
                                    }
                                  : currentFolder
                              )
                            }))
                          }
                          placeholder="Task name"
                          value={task.name}
                        />
                        <textarea
                          aria-label={`Task ${taskIndex + 1} description`}
                          className="min-h-20 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10 sm:col-span-2"
                          onChange={(event) =>
                            updateFormState((currentState) => ({
                              ...currentState,
                              folders: currentState.folders.map((currentFolder) =>
                                currentFolder.clientId === folder.clientId
                                  ? {
                                      ...currentFolder,
                                      tasks: currentFolder.tasks.map((currentTask) =>
                                        currentTask.clientId === task.clientId
                                          ? { ...currentTask, description: event.target.value }
                                          : currentTask
                                      )
                                    }
                                  : currentFolder
                              )
                            }))
                          }
                          placeholder="Optional Task description"
                          value={task.description}
                        />
                        <select
                          aria-label={`Task ${taskIndex + 1} state`}
                          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none focus:border-focus focus:ring-4 focus:ring-focus/10"
                          onChange={(event) =>
                            updateFormState((currentState) => ({
                              ...currentState,
                              folders: currentState.folders.map((currentFolder) =>
                                currentFolder.clientId === folder.clientId
                                  ? {
                                      ...currentFolder,
                                      tasks: currentFolder.tasks.map((currentTask) =>
                                        currentTask.clientId === task.clientId
                                          ? { ...currentTask, state: event.target.value as CreateJourneyTaskState }
                                          : currentTask
                                      )
                                    }
                                  : currentFolder
                              )
                            }))
                          }
                          value={task.state}
                        >
                          {taskStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        <label className="flex h-10 items-center gap-2 text-sm text-text-body">
                          <input
                            checked={task.isVisible}
                            className="size-4 rounded border-border-strong text-primary focus:ring-focus"
                            onChange={(event) =>
                              updateFormState((currentState) => ({
                                ...currentState,
                                folders: currentState.folders.map((currentFolder) =>
                                  currentFolder.clientId === folder.clientId
                                    ? {
                                        ...currentFolder,
                                        tasks: currentFolder.tasks.map((currentTask) =>
                                          currentTask.clientId === task.clientId
                                            ? { ...currentTask, isVisible: event.target.checked }
                                            : currentTask
                                        )
                                      }
                                    : currentFolder
                                )
                              }))
                            }
                            type="checkbox"
                          />
                          Visible Task
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="journey-root-tasks-title" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-text-primary" id="journey-root-tasks-title">
              Journey Tasks
            </h3>
            <p className="mt-1 text-sm text-text-muted">Add Tasks directly under the Journey.</p>
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
          <p className="rounded-xl border border-dashed border-border-strong px-4 py-5 text-center text-sm text-text-muted">
            No root Tasks added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {formState.tasks.map((task, taskIndex) => (
              <div className="rounded-lg border border-border-subtle bg-surface-subtle/60 p-3" key={task.clientId}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    Task {taskIndex + 1}
                  </span>
                  <button
                    aria-label={`Remove root Task ${taskIndex + 1}`}
                    className="flex size-7 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-danger-surface hover:text-danger-foreground focus:outline-none focus:ring-4 focus:ring-focus/20"
                    onClick={() =>
                      updateFormState((currentState) => ({
                        ...currentState,
                        tasks: currentState.tasks.filter((currentTask) => currentTask.clientId !== task.clientId)
                      }))
                    }
                    type="button"
                  >
                    <Icon icon="CloseOutlined" />
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    aria-label={`Root Task ${taskIndex + 1} name`}
                    className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10 sm:col-span-2"
                    maxLength={255}
                    onChange={(event) =>
                      updateFormState((currentState) => ({
                        ...currentState,
                        tasks: currentState.tasks.map((currentTask) =>
                          currentTask.clientId === task.clientId
                            ? { ...currentTask, name: event.target.value }
                            : currentTask
                        )
                      }))
                    }
                    placeholder="Task name"
                    value={task.name}
                  />
                  <textarea
                    aria-label={`Root Task ${taskIndex + 1} description`}
                    className="min-h-20 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10 sm:col-span-2"
                    onChange={(event) =>
                      updateFormState((currentState) => ({
                        ...currentState,
                        tasks: currentState.tasks.map((currentTask) =>
                          currentTask.clientId === task.clientId
                            ? { ...currentTask, description: event.target.value }
                            : currentTask
                        )
                      }))
                    }
                    placeholder="Optional Task description"
                    value={task.description}
                  />
                  <select
                    aria-label={`Root Task ${taskIndex + 1} state`}
                    className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none focus:border-focus focus:ring-4 focus:ring-focus/10"
                    onChange={(event) =>
                      updateFormState((currentState) => ({
                        ...currentState,
                        tasks: currentState.tasks.map((currentTask) =>
                          currentTask.clientId === task.clientId
                            ? { ...currentTask, state: event.target.value as CreateJourneyTaskState }
                            : currentTask
                        )
                      }))
                    }
                    value={task.state}
                  >
                    {taskStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <label className="flex h-10 items-center gap-2 text-sm text-text-body">
                    <input
                      checked={task.isVisible}
                      className="size-4 rounded border-border-strong text-primary focus:ring-focus"
                      onChange={(event) =>
                        updateFormState((currentState) => ({
                          ...currentState,
                          tasks: currentState.tasks.map((currentTask) =>
                            currentTask.clientId === task.clientId
                              ? { ...currentTask, isVisible: event.target.checked }
                              : currentTask
                          )
                        }))
                      }
                      type="checkbox"
                    />
                    Visible Task
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="flex justify-end gap-3 border-t border-border pt-5">
        <button
          className="rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-text-body transition-colors hover:bg-surface-subtle focus:outline-none focus:ring-4 focus:ring-focus/20"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-focus/20"
          type="submit"
        >
          Create Journey
        </button>
      </footer>
    </form>
  )
}

export default CreateJourneyForm
