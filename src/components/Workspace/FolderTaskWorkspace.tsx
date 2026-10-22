'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/Button/Button'
import CreateTaskForm from '@/components/Form/Task/CreateTaskForm'
import Icon from '@/components/Icon/Icon'
import { initTaskForm, useCreateTaskForm, type TaskFormValues } from '@/stores/workspaceFromStore'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'

import TaskItem from './TaskItem'

interface FolderTaskWorkspaceProps {
  folder: ApiFolderWithTasks
  returnHref: string
}

/**
 * Renders the task creation workspace for a resolved Folder and its FormArray.
 *
 * @param folder - Resolved Folder and its existing tasks.
 * @param returnHref - Destination used by the cancel navigation.
 * @returns The Folder task workspace presentation and interactions.
 */
const FolderTaskWorkspace = ({ folder, returnHref }: FolderTaskWorkspaceProps) => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [taskStore] = useState(() => useCreateTaskForm.getState())
  const validationTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const validationVersions = useRef(new Map<string, number>())
  const { createTaskForm, formErrors, formValidity, isSubmitting, isValidating, activeFormId } = useCreateTaskForm()

  useEffect(() => {
    const timers = validationTimers.current
    const versions = validationVersions.current

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
      versions.clear()
      taskStore.setResetTaskForm()
    }
  }, [folder.uid, returnHref, taskStore])

  const validateTaskForm = (formId: string) => {
    const currentStore = useCreateTaskForm.getState()
    const form = currentStore.createTaskForm.find((currentForm) => currentForm.id === formId)

    if (!form) return

    const errors = form.name.trim() ? {} : { name: 'Task name is required.' }
    validationTimers.current.delete(formId)
    currentStore.setFormValidity({ ...currentStore.formValidity, [formId]: Object.keys(errors).length === 0 })
    currentStore.setFormErrors({ ...currentStore.formErrors, [formId]: errors })

    if (validationTimers.current.size === 0) currentStore.setIsValidating(false)
  }

  const handleFormChange = (formId: string, values: Omit<TaskFormValues, 'id'>) => {
    const currentStore = useCreateTaskForm.getState()
    const nextVersion = (validationVersions.current.get(formId) ?? 0) + 1
    const previousTimer = validationTimers.current.get(formId)

    if (previousTimer) clearTimeout(previousTimer)

    validationVersions.current.set(formId, nextVersion)
    currentStore.setCreateTaskForm(
      currentStore.createTaskForm.map((form) => (form.id === formId ? { ...form, ...values } : form))
    )
    currentStore.setFormValidity({ ...currentStore.formValidity, [formId]: false })
    currentStore.setFormErrors({ ...currentStore.formErrors, [formId]: {} })
    currentStore.setIsValidating(true)

    const timer = setTimeout(() => {
      if (validationVersions.current.get(formId) !== nextVersion) return
      validateTaskForm(formId)
    }, 300)

    validationTimers.current.set(formId, timer)
  }

  const canAddTask = !isValidating && createTaskForm.every((form) => formValidity[form.id] === true)
  const canSaveChanges = createTaskForm.length > 0 && canAddTask && !isSubmitting

  const handleAddTask = () => {
    if (!canAddTask) return

    const id = globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const form = { ...initTaskForm, id }
    const currentStore = useCreateTaskForm.getState()

    currentStore.setCreateTaskForm([...currentStore.createTaskForm, form])
    currentStore.setFormValidity({ ...currentStore.formValidity, [id]: false })
    currentStore.setFormErrors({ ...currentStore.formErrors, [id]: {} })
    currentStore.setActiveFormId(id)
    setIsTaskFormOpen(true)
  }

  const handleRemoveTask = (formId: string) => {
    const currentStore = useCreateTaskForm.getState()
    const timer = validationTimers.current.get(formId)

    if (timer) clearTimeout(timer)
    validationTimers.current.delete(formId)
    validationVersions.current.delete(formId)

    const nextValidity = { ...currentStore.formValidity }
    const nextErrors = { ...currentStore.formErrors }
    delete nextValidity[formId]
    delete nextErrors[formId]

    currentStore.setCreateTaskForm(currentStore.createTaskForm.filter((form) => form.id !== formId))
    currentStore.setFormValidity(nextValidity)
    currentStore.setFormErrors(nextErrors)
    if (currentStore.activeFormId === formId) currentStore.setActiveFormId(null)
    if (validationTimers.current.size === 0) currentStore.setIsValidating(false)
  }

  const handlePendingTaskClick = (formId: string) => {
    const currentStore = useCreateTaskForm.getState()
    const currentActiveId = currentStore.activeFormId
    const activeIsBlocked =
      currentActiveId !== null && (currentStore.formValidity[currentActiveId] !== true || isValidating)

    if (currentActiveId !== null && currentActiveId !== formId && activeIsBlocked) return

    if (currentActiveId === formId && currentStore.formValidity[formId] === true && !isValidating) {
      currentStore.setActiveFormId(null)
      setIsTaskFormOpen(false)
      return
    }

    currentStore.setActiveFormId(formId)
    setIsTaskFormOpen(true)
  }

  return (
    <div>
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Folder task workspace</p>
          <h2 className="truncate text-sm font-semibold text-text-primary">Create Task - {folder.name}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button
            buttonSize="normal"
            className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
            color="primary"
            disabled={!canSaveChanges}
            label="Save Changes"
            onClick={() => console.log(createTaskForm)}
            size="nm"
            title={canSaveChanges ? 'Save the current Task forms' : 'Complete all Task forms before saving'}
            type="button"
            variant="filled"
          />
          <Link href={returnHref} scroll={false}>
            <Button
              buttonSize="normal"
              color="neutral"
              icon={<Icon icon="AppstoreOutlined" />}
              label="Return"
              type="button"
              variant="outlined"
            />
          </Link>
        </div>
      </header>

      <section className="px-5 py-5">
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Tasks</div>
          <div className="border-t border-border-subtle px-3 py-2">
            <Button
              buttonSize="normal"
              className="text-text-muted hover:border-primary/50 hover:text-primary"
              color="neutral"
              disabled={!canAddTask}
              icon={<Icon icon="PlusOutlined" />}
              label="Add Task"
              onClick={handleAddTask}
              size="full"
              type="button"
              variant="dotted"
            />
          </div>
          {createTaskForm.map((form) => (
            <div key={form.id}>
              <TaskItem
                isInvalid={Boolean(formErrors[form.id] && Object.keys(formErrors[form.id]).length > 0)}
                isValid={formValidity[form.id] === true}
                onRemove={() => handleRemoveTask(form.id)}
                onSelect={() => handlePendingTaskClick(form.id)}
                pendingTask={form}
              />
              {activeFormId === form.id && isTaskFormOpen && (
                <div className="border-t border-border-subtle" onClick={(event) => event.stopPropagation()}>
                  <CreateTaskForm
                    idPrefix={`folder-task-${form.id}`}
                    initialValues={{
                      description: form.description,
                      isVisible: form.isVisible,
                      name: form.name,
                      state: form.state
                    }}
                    onCancel={() => {
                      if (formValidity[form.id] === true && !isValidating) {
                        useCreateTaskForm.getState().setActiveFormId(null)
                        setIsTaskFormOpen(false)
                      }
                    }}
                    onFormChange={(values) => handleFormChange(form.id, values)}
                    reference={{ name: folder.name, type: 'folder' }}
                  />
                </div>
              )}
            </div>
          ))}
          {folder.tasks.map((task) => (
            <TaskItem key={task.uid} task={task} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default FolderTaskWorkspace
