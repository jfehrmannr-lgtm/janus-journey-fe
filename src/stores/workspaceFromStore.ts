import { create } from 'zustand'
import type { ApiTaskState } from '@/types/resource-api.type'
import type { CreateJourneyFormState } from '@/types/createJourney'

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
  formValidity: {} as Record<string, boolean>,
  isValid: false,
  isSubmitting: false,
  activeFormId: null as string | null,
  isValidating: false
}

export const initFolderState = {
  createFolderForm: [] as FolderFormValues[],
  formErrors: {} as Record<string, FolderFormErrors>,
  formValidity: {},
  isSubmitting: false,
  activeFormId: null as string | null,
  isValidating: false
}

type JourneyFormDraft = Pick<CreateJourneyFormState, 'name' | 'description'>

export const initJourneyState: JourneyFormDraft = {
  name: '',
  description: ''
}

// Task store

interface CreateTaskFormState {
  createTaskForm: TaskFormValues[]
  formErrors: Record<string, TaskFormErrors>
  formValidity: Record<string, boolean>
  isValid: boolean
  isSubmitting: boolean
  activeFormId: string | null
  isValidating: boolean

  setCreateTaskForm: (forms: TaskFormValues[]) => void
  setFormErrors: (errors: Record<string, TaskFormErrors>) => void
  setFormValidity: (validity: Record<string, boolean>) => void
  setIsValid: (isValid: boolean) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  setResetTaskForm: () => void
  setActiveFormId: (id: string | null) => void
  setIsValidating: (isValidating: boolean) => void
}

export const useCreateTaskForm = create<CreateTaskFormState>((set) => ({
  ...initTaskState,

  setCreateTaskForm: (forms) => set({ createTaskForm: forms }),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setFormValidity: (validity) => set({ formValidity: validity }),
  setIsValid: (isValid) => set({ isValid }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setResetTaskForm: () => set({ ...initTaskState }),
  setActiveFormId: (id: string | null) => set({ activeFormId: id }),
  setIsValidating: (isValidating: boolean) => set({ isValidating })
}))

// Folder store

interface CreateFolderFormState {
  createFolderForm: FolderFormValues[]
  formErrors: Record<string, FolderFormErrors>
  formValidity: Record<string, boolean>
  isSubmitting: boolean
  activeFormId: string | null
  isValidating: boolean

  setCreateFolderForm: (forms: FolderFormValues[]) => void
  setFormErrors: (errors: Record<string, FolderFormErrors>) => void
  setFormValidity: (validity: Record<string, boolean>) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  setResetFolder: () => void
  setActiveFormId: (id: string | null) => void
  setIsValidating: (isValidating: boolean) => void
}

export const useCreateFolderForm = create<CreateFolderFormState>((set) => ({
  ...initFolderState,

  setCreateFolderForm: (forms) => set({ createFolderForm: forms }),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setFormValidity: (validity) => set({ formValidity: validity }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setResetFolder: () => set({ ...initFolderState }),
  setActiveFormId: (id: string | null) => set({ activeFormId: id }),
  setIsValidating: (isValidating: boolean) => set({ isValidating: isValidating })
}))

interface CreateJourneyFormStore {
  createJourneyForm: JourneyFormDraft
  setCreateJourneyForm: (form: JourneyFormDraft) => void
  setResetJourney: () => void
}

/**
 * Stores the Journey creation form draft alongside the Folder and Task workspace forms.
 */
export const useCreateJourneyForm = create<CreateJourneyFormStore>((set) => ({
  createJourneyForm: initJourneyState,
  setCreateJourneyForm: (form) => set({ createJourneyForm: form }),
  setResetJourney: () => set({ createJourneyForm: initJourneyState })
}))
