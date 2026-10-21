import { create } from 'zustand'
import type { ApiTaskState } from '@/types/resource-api.type'

export interface TaskFormValues {
  id: string
  name: string
  description: string
  state: ApiTaskState
  isVisible: boolean
}

export interface FolderFormValues {
  id: string
  name: string
  description: string
}

export type TaskFormErrors = Partial<Record<Exclude<keyof TaskFormValues, 'id'>, string>>

export type FolderFormErrors = Partial<Record<Exclude<keyof FolderFormValues, 'id'>, string>>

// Initial form values

export const initTaskForm: TaskFormValues = {
  id: '',
  name: '',
  description: '',
  state: 'pending',
  isVisible: true
}

export const initFolderForm: FolderFormValues = {
  id: '',
  name: '',
  description: ''
}

// Initial store states

export const initTaskState = {
  createTaskForm: [] as TaskFormValues[],
  formErrors: {} as Record<string, TaskFormErrors>,
  isValid: false,
  isSubmitting: false
}

export const initFolderState = {
  createFolderForm: [] as FolderFormValues[],
  formErrors: {} as Record<string, FolderFormErrors>,
  isValid: false,
  isSubmitting: false
}

// Task store

interface CreateTaskFormState {
  createTaskForm: TaskFormValues[]
  formErrors: Record<string, TaskFormErrors>
  isValid: boolean
  isSubmitting: boolean

  setCreateTaskForm: (forms: TaskFormValues[]) => void
  setFormErrors: (errors: Record<string, TaskFormErrors>) => void
  setIsValid: (isValid: boolean) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  setResetTaskForm: () => void
}

export const useCreateTaskForm = create<CreateTaskFormState>((set) => ({
  ...initTaskState,

  setCreateTaskForm: (forms) => set({ createTaskForm: forms }),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setIsValid: (isValid) => set({ isValid }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setResetTaskForm: () => set({ ...initTaskState })
}))

// Folder store

interface CreateFolderFormState {
  createFolderForm: FolderFormValues[]
  formErrors: Record<string, FolderFormErrors>
  isValid: boolean
  isSubmitting: boolean

  setCreateFolderForm: (forms: FolderFormValues[]) => void
  setFormErrors: (errors: Record<string, FolderFormErrors>) => void
  setIsValid: (isValid: boolean) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  setResetFolder: () => void
}

export const useCreateFolderForm = create<CreateFolderFormState>((set) => ({
  ...initFolderState,

  setCreateFolderForm: (forms) => set({ createFolderForm: forms }),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setIsValid: (isValid) => set({ isValid }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setResetFolder: () => set({ ...initFolderState })
}))
