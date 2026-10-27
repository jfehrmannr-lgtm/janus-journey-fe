'use client'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { initTaskForm, useCreateTaskForm, type TaskFormValues } from '@/stores/workspaceFromStore'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import type { CreateTaskBulkPayload, CreateTaskBulkResponse } from '@/types/task-api.type'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'

interface UseFolderTaskWorkspaceProps {
  createFolderTaskAction: (payload: CreateTaskBulkPayload) => Promise<CreateTaskBulkResponse>
  folderId: string
  journeyId: string
}

/**
 * Manages pending Folder Task forms, validation, and bulk Task submission.
 *
 * @param createFolderTaskAction - Server Action used to submit the pending Task batch.
 * @param folderId - Folder UID used as the parent for created Tasks.
 * @param journeyId - Journey UID whose resource tree is updated after creation.
 * @returns Folder Task workspace state, callbacks, and lifecycle cleanup.
 */
const useFolderTaskWorkspace = ({ createFolderTaskAction, folderId, journeyId }: UseFolderTaskWorkspaceProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [taskStore] = useState(() => useCreateTaskForm.getState())
  const validationTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const validationVersions = useRef(new Map<string, number>())
  const { createTaskForm, formErrors, formValidity, isValidating, activeFormId } = useCreateTaskForm()

  const createTaskMutation = useMutation({
    mutationFn: (payload: CreateTaskBulkPayload) => createFolderTaskAction(payload),
    onError: (error: unknown, _payload, context) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create Tasks.', { id: context?.toastId })
      console.error(error)
    },
    onMutate: () => ({ toastId: toast.loading('Creating Tasks...') }),
    onSuccess: (response, _payload, context) => {
      queryClient.setQueryData<ApiJourneyWithResources>(
        navigationQueryKeys.resourceTree('journey', journeyId),
        (journey) => {
          if (!journey) return journey

          return {
            ...journey,
            folders: journey.folders.map((folder) =>
              folder.uid === folderId ? { ...folder, tasks: folder.tasks.concat(response.payload) } : folder
            )
          }
        }
      )
      toast.success('Tasks created successfully.', { id: context?.toastId })
      router.push(`/dashboard/home/journey/${encodeURIComponent(journeyId)}`)
    }
  })

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
  const canSaveChanges = createTaskForm.length > 0 && canAddTask && !createTaskMutation.isPending

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

  const handleCancelTask = (formId: string) => {
    if (formValidity[formId] === true && !isValidating) {
      useCreateTaskForm.getState().setActiveFormId(null)
      setIsTaskFormOpen(false)
    }
  }

  const handleSaveChanges = () => {
    if (!canSaveChanges) return

    const payload: CreateTaskBulkPayload = useCreateTaskForm.getState().createTaskForm.map((form) => ({
      description: form.description.trim() || null,
      isVisible: form.isVisible,
      name: form.name.trim(),
      parent: { type: 'folder', uid: folderId },
      state: form.state
    }))

    createTaskMutation.mutate(payload)
  }

  const cleanup = useCallback(() => {
    validationTimers.current.forEach((timer) => clearTimeout(timer))
    validationTimers.current.clear()
    validationVersions.current.clear()
    taskStore.setResetTaskForm()
  }, [taskStore])

  return {
    activeFormId,
    canAddTask,
    canSaveChanges,
    cleanup,
    createTaskForm,
    formErrors,
    formValidity,
    handleAddTask,
    handleCancelTask,
    handleFormChange,
    handlePendingTaskClick,
    handleRemoveTask,
    handleSaveChanges,
    isSubmitting: createTaskMutation.isPending,
    isTaskFormOpen
  }
}

export default useFolderTaskWorkspace
