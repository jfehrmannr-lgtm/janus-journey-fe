'use client'

import { useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { getDashboardHomeData } from '@/services/dashboardService'
import { getResourcePath } from '@/modules/dashboard/utils/dashboardRoutes'
import {
  initFolderForm,
  initTaskForm,
  useCreateFolderForm,
  useCreateJourneyForm,
  useCreateTaskForm,
  type FolderFormErrors,
  type FolderFormValues,
  type JourneyFormErrors,
  type JourneyFormValues,
  type ResourceFormErrors,
  type ResourceFormValues,
  type TaskFormErrors,
  type TaskFormValues
} from '@/stores/workspaceFromStore'
import type { ApiResponse } from '@/types/api.type'
import type { CreateJourneyPayload } from '@/types/createJourney'
import type { CreateFolderBulkItem } from '@/types/folder-api.type'
import type { ApiFolder, ApiJourney, ApiTask } from '@/types/resource-api.type'
import type { CreateTaskBulkItem } from '@/types/task-api.type'
import type { NavigationRootResources } from '@/types/navigation.type'
import type { ResourceType } from '@/types/resource.type'
import { resourceDescriptionMaxLength, resourceNameMaxLength } from '@/modules/dashboard/utils/createJourneyPayload'

interface UseCreateResourcePageContentProps {
  resourceType: ResourceType
  actions: {
    createJourneyAction?: (payload: CreateJourneyPayload) => Promise<ApiResponse<ApiJourney>>
    createFolderAction?: (payload: CreateFolderBulkItem) => Promise<ApiResponse<ApiFolder>>
    createTaskAction?: (payload: CreateTaskBulkItem) => Promise<ApiResponse<ApiTask>>
  }
}

interface CreateResourceMutationInput {
  form: ResourceFormValues
  resourceType: ResourceType
}

interface CreateResourceMutationContext {
  toastId: string
}

type CreateResourceMutationResponse = ApiResponse<ApiJourney | ApiFolder | ApiTask>

const folderFormId = 'create-folder'
const taskFormId = 'create-task'

/**
 * Validates the shared name and description fields for a resource draft.
 *
 * @param name - Resource name being validated.
 * @param description - Resource description being validated.
 * @param resourceType - Resource type used in validation messages.
 * @returns Validation errors for the resource draft.
 */
const getResourceFormErrors = (name: string, description: string, resourceType: ResourceType): ResourceFormErrors => {
  const errors: Partial<Record<'name' | 'description', string>> = {}
  const label = resourceType.charAt(0).toUpperCase() + resourceType.slice(1)

  if (!name.trim()) {
    errors.name = `${label} name is required.`
  } else if (name.length > resourceNameMaxLength) {
    errors.name = `${label} name must be ${resourceNameMaxLength} characters or fewer.`
  }

  if (description.length > resourceDescriptionMaxLength) {
    errors.description = `${label} description must be ${resourceDescriptionMaxLength} characters or fewer.`
  }

  return errors as JourneyFormErrors & FolderFormErrors & TaskFormErrors
}

/**
 * Coordinates resource creation drafts, validation, and resource-specific mutations.
 *
 * @param resourceType - Resource type being created.
 * @param actions - Server Actions available to the selected resource.
 * @returns Resource form values, validation feedback, and submission callbacks.
 */
const useCreateResourcePageContent = ({ resourceType, actions }: UseCreateResourcePageContentProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const validationTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const validationVersion = useRef(0)

  const journeyForm = useCreateJourneyForm((state) => state.createJourneyForm)
  const journeyErrors = useCreateJourneyForm((state) => state.formErrors)
  const journeyIsValid = useCreateJourneyForm((state) => state.isValid)
  const folderForms = useCreateFolderForm((state) => state.createFolderForm)
  const folderErrors = useCreateFolderForm((state) => state.formErrors)
  const folderValidity = useCreateFolderForm((state) => state.formValidity)
  const taskForms = useCreateTaskForm((state) => state.createTaskForm)
  const taskErrors = useCreateTaskForm((state) => state.formErrors)
  const taskValidity = useCreateTaskForm((state) => state.formValidity)

  const folderForm: FolderFormValues = folderForms[0] ?? { ...initFolderForm, id: folderFormId }
  const taskForm: TaskFormValues = taskForms[0] ?? { ...initTaskForm, id: taskFormId }
  const selectedForm: ResourceFormValues =
    resourceType === 'journey' ? journeyForm : resourceType === 'folder' ? folderForm : taskForm
  const selectedErrors: ResourceFormErrors =
    resourceType === 'journey'
      ? journeyErrors
      : resourceType === 'folder'
        ? (folderErrors[folderForm.id] ?? {})
        : (taskErrors[taskForm.id] ?? {})
  const selectedIsValid =
    resourceType === 'journey'
      ? journeyIsValid
      : resourceType === 'folder'
        ? folderValidity[folderForm.id] === true
        : taskValidity[taskForm.id] === true

  const createResourceMutation = useMutation<
    CreateResourceMutationResponse,
    unknown,
    CreateResourceMutationInput,
    CreateResourceMutationContext
  >({
    mutationFn: async ({ form, resourceType: mutationResourceType }) => {
      if (mutationResourceType === 'journey' && actions.createJourneyAction) {
        return actions.createJourneyAction(form as CreateJourneyPayload)
      }

      if (mutationResourceType === 'folder' && actions.createFolderAction) {
        const folder = form as FolderFormValues
        return actions.createFolderAction({
          description: folder.description.trim() || null,
          name: folder.name.trim()
        })
      }

      if (mutationResourceType === 'task' && actions.createTaskAction) {
        const task = form as TaskFormValues
        return actions.createTaskAction({
          description: task.description.trim() || null,
          isVisible: task.isVisible,
          name: task.name.trim(),
          state: task.state
        })
      }

      throw new Error(`Unable to create ${mutationResourceType}.`)
    },
    onError: (error: unknown, _input, context) => {
      const label = resourceType.charAt(0).toUpperCase() + resourceType.slice(1)
      toast.error(error instanceof Error ? error.message : `Failed to create ${label}.`, {
        id: context?.toastId
      })
      console.error(error)
    },
    onMutate: () => ({ toastId: toast.loading(`Creating ${resourceType}...`) }),
    onSuccess: (response, input, context) => {
      const payload = response.payload

      if (input.resourceType === 'journey') {
        const journey = payload as ApiJourney
        queryClient.setQueryData<NavigationRootResources>(navigationQueryKeys.rootResources(), (resources) =>
          resources ? { ...resources, journeys: resources.journeys.concat(journey) } : resources
        )
        queryClient.setQueryData(navigationQueryKeys.resourceTree('journey', journey.uid), {
          ...journey,
          folders: [],
          tasks: []
        })
        toast.success('Journey created successfully.', { id: context?.toastId })
        router.push(getResourcePath('journey', journey.uid))
        return
      }

      const rootResources = queryClient.setQueryData<NavigationRootResources>(
        navigationQueryKeys.rootResources(),
        (resources) => {
          if (!resources) return resources

          return input.resourceType === 'folder'
            ? {
                ...resources,
                rootFolders: resources.rootFolders.concat(
                  payload as unknown as NavigationRootResources['rootFolders'][number]
                )
              }
            : {
                ...resources,
                rootTasks: resources.rootTasks.concat(
                  payload as unknown as NavigationRootResources['rootTasks'][number]
                )
              }
        }
      )

      if (rootResources) {
        queryClient.setQueryData(['dashboard', 'home'], getDashboardHomeData(rootResources))
      }

      const label = input.resourceType.charAt(0).toUpperCase() + input.resourceType.slice(1)
      toast.success(`${label} created successfully.`, { id: context?.toastId })
      router.push('/dashboard/home')
    }
  })

  const validateForm = useCallback(
    (form: ResourceFormValues = selectedForm) => {
      const errors = getResourceFormErrors(form.name, form.description, resourceType)
      const isValid = Object.keys(errors).length === 0

      if (resourceType === 'journey') {
        const currentStore = useCreateJourneyForm.getState()
        currentStore.setFormErrors(errors as JourneyFormErrors)
        currentStore.setIsValid(isValid)
      } else if (resourceType === 'folder') {
        const currentStore = useCreateFolderForm.getState()
        currentStore.setFormErrors({ ...currentStore.formErrors, [folderForm.id]: errors as FolderFormErrors })
        currentStore.setFormValidity({ ...currentStore.formValidity, [folderForm.id]: isValid })
      } else {
        const currentStore = useCreateTaskForm.getState()
        currentStore.setFormErrors({ ...currentStore.formErrors, [taskForm.id]: errors as TaskFormErrors })
        currentStore.setFormValidity({ ...currentStore.formValidity, [taskForm.id]: isValid })
      }

      return isValid
    },
    [folderForm.id, resourceType, selectedForm, taskForm.id]
  )

  const handleFormChange = useCallback(
    (form: ResourceFormValues) => {
      const nextVersion = validationVersion.current + 1
      validationVersion.current = nextVersion
      if (validationTimer.current) clearTimeout(validationTimer.current)

      if (resourceType === 'journey') {
        const currentStore = useCreateJourneyForm.getState()
        currentStore.setCreateJourneyForm(form as JourneyFormValues)
        currentStore.setFormErrors({})
        currentStore.setIsValid(false)
      } else if (resourceType === 'folder') {
        const currentStore = useCreateFolderForm.getState()
        const nextForm = { ...(form as FolderFormValues), id: folderForm.id }
        currentStore.setCreateFolderForm([nextForm])
        currentStore.setFormErrors({ ...currentStore.formErrors, [folderForm.id]: {} })
        currentStore.setFormValidity({ ...currentStore.formValidity, [folderForm.id]: false })
      } else {
        const currentStore = useCreateTaskForm.getState()
        const nextForm = { ...(form as TaskFormValues), id: taskForm.id }
        currentStore.setCreateTaskForm([nextForm])
        currentStore.setFormErrors({ ...currentStore.formErrors, [taskForm.id]: {} })
        currentStore.setFormValidity({ ...currentStore.formValidity, [taskForm.id]: false })
      }

      validationTimer.current = setTimeout(() => {
        if (validationVersion.current !== nextVersion) return
        validateForm(form)
        validationTimer.current = null
      }, 300)
    },
    [folderForm.id, resourceType, taskForm.id, validateForm]
  )

  const handleSubmit = useCallback(() => {
    if (!validateForm() || createResourceMutation.isPending) return
    createResourceMutation.mutate({ form: selectedForm, resourceType })
  }, [createResourceMutation, resourceType, selectedForm, validateForm])

  return {
    canSubmit: selectedIsValid,
    createResourceForm: selectedForm,
    formErrors: selectedErrors,
    isSubmitting: createResourceMutation.isPending,
    onFormChange: handleFormChange,
    onSubmit: handleSubmit,
    onValidate: validateForm
  }
}

export default useCreateResourcePageContent
