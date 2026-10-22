'use client'

import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { initFolderForm, useCreateFolderForm, type FolderFormValues } from '@/stores/workspaceFromStore'
import type { CreateFolderBulkPayload, CreateFolderBulkResponse } from '@/types/folder-api.type'

interface UseFolderWorkspaceProps {
  createFolderAction: (payload: CreateFolderBulkPayload) => Promise<CreateFolderBulkResponse>
  journeyId: string
}

/**
 * Manages pending Folder forms, validation, and bulk Folder submission.
 *
 * @param createFolderAction - Server Action used to submit the pending Folder batch.
 * @param journeyId - Journey UID used as the parent for created Folders.
 * @returns Folder workspace state, callbacks, and lifecycle cleanup.
 */
const useFolderWorkspace = ({ createFolderAction, journeyId }: UseFolderWorkspaceProps) => {
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false)
  const [folderStore] = useState(() => useCreateFolderForm.getState())
  const validationTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const validationVersions = useRef(new Map<string, number>())

  const { createFolderForm, formErrors, formValidity, isSubmitting, isValidating, activeFormId } = useCreateFolderForm()

  const validateFolderForm = (formId: string) => {
    const currentStore = useCreateFolderForm.getState()
    const form = currentStore.createFolderForm.find((currentForm) => currentForm.id === formId)

    if (!form) return

    const errors = form.name.trim() ? {} : { name: 'Folder name is required.' }
    const nextTimers = validationTimers.current

    nextTimers.delete(formId)
    currentStore.setFormValidity({
      ...currentStore.formValidity,
      [formId]: Object.keys(errors).length === 0
    })
    currentStore.setFormErrors({ ...currentStore.formErrors, [formId]: errors })

    if (nextTimers.size === 0) currentStore.setIsValidating(false)
  }

  const handleFormChange = (formId: string, values: Omit<FolderFormValues, 'id'>) => {
    const currentStore = useCreateFolderForm.getState()
    const nextVersion = (validationVersions.current.get(formId) ?? 0) + 1
    const previousTimer = validationTimers.current.get(formId)

    if (previousTimer) clearTimeout(previousTimer)

    validationVersions.current.set(formId, nextVersion)
    currentStore.setCreateFolderForm(
      currentStore.createFolderForm.map((form) => (form.id === formId ? { ...form, ...values } : form))
    )
    currentStore.setFormValidity({ ...currentStore.formValidity, [formId]: false })
    currentStore.setFormErrors({ ...currentStore.formErrors, [formId]: {} })
    currentStore.setIsValidating(true)

    const timer = setTimeout(() => {
      if (validationVersions.current.get(formId) !== nextVersion) return
      validateFolderForm(formId)
    }, 500)

    validationTimers.current.set(formId, timer)
  }

  const canAddFolder = !isValidating && createFolderForm.every((form) => formValidity[form.id] === true)
  const canSaveChanges = createFolderForm.length > 0 && canAddFolder && !isSubmitting

  const handleAddFolder = () => {
    if (!canAddFolder) return

    const id = globalThis.crypto?.randomUUID?.() ?? `folder-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const form = { ...initFolderForm, id }

    folderStore.setCreateFolderForm([...useCreateFolderForm.getState().createFolderForm, form])
    folderStore.setFormValidity({ ...useCreateFolderForm.getState().formValidity, [id]: false })
    folderStore.setFormErrors({ ...useCreateFolderForm.getState().formErrors, [id]: {} })
    folderStore.setActiveFormId(id)
    setIsFolderFormOpen(true)
  }

  const handleRemoveFolder = (formId: string) => {
    const currentStore = useCreateFolderForm.getState()
    const timer = validationTimers.current.get(formId)

    if (timer) clearTimeout(timer)
    validationTimers.current.delete(formId)
    validationVersions.current.delete(formId)

    const nextValidity = { ...currentStore.formValidity }
    const nextErrors = { ...currentStore.formErrors }
    delete nextValidity[formId]
    delete nextErrors[formId]

    currentStore.setCreateFolderForm(currentStore.createFolderForm.filter((form) => form.id !== formId))
    currentStore.setFormValidity(nextValidity)
    currentStore.setFormErrors(nextErrors)
    if (currentStore.activeFormId === formId) currentStore.setActiveFormId(null)
    if (validationTimers.current.size === 0) currentStore.setIsValidating(false)
  }

  const handlePendingFolderClick = (formId: string) => {
    const currentStore = useCreateFolderForm.getState()
    const currentActiveId = currentStore.activeFormId
    const activeIsBlocked =
      currentActiveId !== null && (currentStore.formValidity[currentActiveId] !== true || isValidating)

    if (currentActiveId !== null && currentActiveId !== formId && activeIsBlocked) return

    if (currentActiveId === formId && currentStore.formValidity[formId] === true && !isValidating) {
      currentStore.setActiveFormId(null)
      setIsFolderFormOpen(false)
      return
    }

    currentStore.setActiveFormId(formId)
    setIsFolderFormOpen(true)
  }

  const handleCancelFolder = (formId: string) => {
    if (formValidity[formId] === true && !isValidating) {
      useCreateFolderForm.getState().setActiveFormId(null)
      setIsFolderFormOpen(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!canSaveChanges) return

    const currentStore = useCreateFolderForm.getState()
    const payload: CreateFolderBulkPayload = currentStore.createFolderForm.map((form) => ({
      description: form.description.trim() || null,
      name: form.name.trim(),
      parent: { type: 'journey', uid: journeyId }
    }))

    currentStore.setIsSubmitting(true)

    try {
      await createFolderAction(payload)
      toast.success('Folders created successfully.')
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to create Folders.')
    } finally {
      useCreateFolderForm.getState().setIsSubmitting(false)
    }
  }

  const cleanup = useCallback(() => {
    validationTimers.current.forEach((timer) => clearTimeout(timer))
    validationTimers.current.clear()
    validationVersions.current.clear()
    folderStore.setResetFolder()
  }, [folderStore])

  return {
    activeFormId,
    canAddFolder,
    canSaveChanges,
    cleanup,
    createFolderForm,
    formErrors,
    formValidity,
    handleAddFolder,
    handleCancelFolder,
    handleFormChange,
    handlePendingFolderClick,
    handleRemoveFolder,
    handleSaveChanges,
    isFolderFormOpen,
    isSubmitting
  }
}

export default useFolderWorkspace
