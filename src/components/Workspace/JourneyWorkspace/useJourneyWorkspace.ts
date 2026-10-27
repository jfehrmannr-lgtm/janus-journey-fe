'use client'

import { useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useCreateJourneyForm, type JourneyFormErrors } from '@/stores/workspaceFromStore'
import type { CreateJourneyPayload } from '@/types/createJourney'
import type { ApiResponse } from '@/types/api.type'
import type { ApiJourney, ApiJourneyWithResources } from '@/types/resource-api.type'
import type { Journey } from '@/types/resource.type'
import type { NavigationRootResources } from '@/types/navigation.type'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'

interface JourneyFormValues {
  name: string
  description: string
}

interface UseJourneyWorkspaceProps {
  createJourneyAction: (payload: CreateJourneyPayload) => Promise<ApiResponse<ApiJourney>>
}

/**
 * Returns validation errors for the current Journey draft.
 *
 * @param name - Journey name being validated.
 * @returns Validation errors keyed by Journey field.
 */
const getJourneyFormErrors = ({ name }: JourneyFormValues): JourneyFormErrors => {
  return name.trim() ? {} : { name: 'Journey name is required.' }
}

/**
 * Coordinates Create Journey draft updates, validation, and submission readiness.
 *
 * @param createJourneyAction - Server Action used to create the Journey.
 * @returns Journey form values, validation feedback, and submission callbacks.
 */
const useJourneyWorkspace = ({ createJourneyAction }: UseJourneyWorkspaceProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const validationTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const validationVersion = useRef(0)
  const createJourneyForm = useCreateJourneyForm((state) => state.createJourneyForm)
  const formErrors = useCreateJourneyForm((state) => state.formErrors)
  const isValid = useCreateJourneyForm((state) => state.isValid)

  const createJourneyMutation = useMutation({
    mutationFn: (payload: CreateJourneyPayload) => createJourneyAction(payload),
    onError: (error: unknown, _payload, context) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create Journey.', { id: context?.toastId })
      console.error(error)
    },
    onMutate: () => ({ toastId: toast.loading('Creating Journey...') }),
    onSuccess: (response, _payload, context) => {
      const apiJourney = response.payload
      const journey: Journey = {
        uid: apiJourney.uid,
        type: 'journey',
        parentUid: apiJourney.parent.uid,
        name: apiJourney.name,
        description: apiJourney.description ?? '',
        updatedAt: apiJourney.updatedAt
      }
      const journeyWithResources: ApiJourneyWithResources = {
        ...apiJourney,
        folders: [],
        tasks: []
      }

      queryClient.setQueryData<NavigationRootResources>(navigationQueryKeys.rootResources(), (resources) =>
        resources ? { ...resources, journeys: resources.journeys.concat(journey) } : resources
      )
      queryClient.setQueryData(navigationQueryKeys.resourceTree('journey', apiJourney.uid), journeyWithResources)

      toast.success('Journey created successfully.', { id: context?.toastId })
      router.push(`/dashboard/home/journey/${encodeURIComponent(apiJourney.uid)}`)
    }
  })

  const handleFormChange = useCallback((form: JourneyFormValues) => {
    const currentStore = useCreateJourneyForm.getState()
    const nextVersion = validationVersion.current + 1

    validationVersion.current = nextVersion
    if (validationTimer.current) clearTimeout(validationTimer.current)

    currentStore.setCreateJourneyForm(form)
    currentStore.setFormErrors({})
    currentStore.setIsValid(false)
    validationTimer.current = setTimeout(() => {
      if (validationVersion.current !== nextVersion) return

      const formErrors = getJourneyFormErrors(form)
      currentStore.setFormErrors(formErrors)
      currentStore.setIsValid(Object.keys(formErrors).length === 0)
      validationTimer.current = null
    }, 300)
  }, [])

  const validateJourneyForm = useCallback(() => {
    if (validationTimer.current) clearTimeout(validationTimer.current)
    validationTimer.current = null
    const currentStore = useCreateJourneyForm.getState()
    const formErrors = getJourneyFormErrors(currentStore.createJourneyForm)

    currentStore.setFormErrors(formErrors)
    currentStore.setIsValid(Object.keys(formErrors).length === 0)
  }, [])

  const handleSubmit = useCallback(() => {
    validateJourneyForm()
    const currentStore = useCreateJourneyForm.getState()

    if (!currentStore.isValid || createJourneyMutation.isPending) return

    const payload: CreateJourneyPayload = {
      description: currentStore.createJourneyForm.description.trim() || null,
      name: currentStore.createJourneyForm.name.trim()
    }

    createJourneyMutation.mutate(payload)
  }, [createJourneyMutation, validateJourneyForm])

  return {
    canSubmit: isValid,
    createJourneyForm,
    formErrors,
    isSubmitting: createJourneyMutation.isPending,
    onFormChange: handleFormChange,
    onSubmit: handleSubmit,
    onValidate: validateJourneyForm
  }
}

export default useJourneyWorkspace
