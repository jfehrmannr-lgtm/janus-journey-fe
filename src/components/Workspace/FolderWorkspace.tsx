'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/Button/Button'
import CreateFolderForm from '@/components/Form/Folder/CreateFolderForm'
import Icon from '@/components/Icon/Icon'
import FolderItem from '@/components/Workspace/FolderItem'
import { initFolderForm, useCreateFolderForm, type FolderFormValues } from '@/stores/workspaceFromStore'
import type { ApiFolder, ApiFolderWithTasks } from '@/types/resource-api.type'

interface FolderWorkspaceProps {
  folders: ApiFolder[]
  reference?: {
    name: string
    type: 'journey' | 'folder' | 'user'
  }
  returnHref: string
  actions: {
    createFolderAction?: () => Promise<ApiFolder>
  }
}

/**
 * Renders the shared Folder workspace.
 *
 * @param folders - Sibling Folders already resolved by the parent container.
 * @param reference - Optional parent resource displayed in the Folder form.
 * @param returnHref - Destination used by the cancel navigation.
 * @returns The Folder workspace presentation and navigation.
 */
const FolderWorkspace = ({ folders, reference, returnHref }: FolderWorkspaceProps) => {
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false)
  const [folderStore] = useState(() => useCreateFolderForm.getState())
  const validationTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const validationVersions = useRef(new Map<string, number>())

  const { createFolderForm, formErrors, formValidity, isSubmitting, isValidating, activeFormId } = useCreateFolderForm()

  useEffect(() => {
    const timers = validationTimers.current
    const versions = validationVersions.current

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
      versions.clear()
      folderStore.setResetFolder()
    }
  }, [folderStore, returnHref])

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

  return (
    <div>
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Folder workspace</p>
          <h2 className="truncate text-sm font-semibold text-text-primary">Create Folder</h2>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button
            buttonSize="normal"
            className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
            color="primary"
            disabled={!canSaveChanges}
            label="Save Changes"
            onClick={() => console.log(createFolderForm)}
            size="nm"
            title={canSaveChanges ? 'Save the current Folder forms' : 'Complete all Folder forms before saving'}
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
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Folders</div>
          <div className="border-t border-border-subtle px-3 py-2">
            <Button
              buttonSize="normal"
              className="text-text-muted hover:border-primary/50 hover:text-primary"
              color="neutral"
              disabled={!canAddFolder}
              icon={<Icon icon="PlusOutlined" />}
              label="Add Folder"
              size="full"
              type="button"
              onClick={handleAddFolder}
              variant="dotted"
            />
          </div>
          {createFolderForm.map((form) => {
            return (
              <div className="mx-3 mt-3" key={form.id}>
                <div className="cursor-pointer w-full">
                  <FolderItem
                    isInvalid={Boolean(formErrors[form.id] && Object.keys(formErrors[form.id]).length > 0)}
                    isValid={formValidity[form.id] === true}
                    onRemove={() => handleRemoveFolder(form.id)}
                    onSelect={() => handlePendingFolderClick(form.id)}
                    pendingFolder={form}
                  />
                </div>
                {activeFormId === form.id && isFolderFormOpen && (
                  <div className="border-t border-border-subtle" onClick={(event) => event.stopPropagation()}>
                    <CreateFolderForm
                      idPrefix={`workspace-folder-${form.id}`}
                      initialValues={{ description: form.description, name: form.name }}
                      onCancel={() => {
                        if (formValidity[form.id] === true && !isValidating) {
                          useCreateFolderForm.getState().setActiveFormId(null)
                          setIsFolderFormOpen(false)
                        }
                      }}
                      onFormChange={(values) => handleFormChange(form.id, values)}
                      reference={reference}
                    />
                  </div>
                )}
              </div>
            )
          })}
          <div className="space-y-3 p-3">
            {folders.map((folder) => (
              <FolderItem
                disableCollapse
                folder={folder as ApiFolderWithTasks}
                key={folder.uid}
                showCreateTaskAction={false}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FolderWorkspace
