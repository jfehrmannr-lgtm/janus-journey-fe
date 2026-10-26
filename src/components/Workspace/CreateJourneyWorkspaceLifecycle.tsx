'use client'

import { useEffect, type ReactNode } from 'react'

import { useCreateJourneyForm } from '@/stores/workspaceFromStore'

interface CreateJourneyWorkspaceLifecycleProps {
  children: ReactNode
}

/**
 * Resets the Create Journey draft when the creation workspace leaves the tree.
 *
 * @param children - Create Journey workspace content.
 * @returns The unchanged workspace content.
 */
const CreateJourneyWorkspaceLifecycle = ({ children }: CreateJourneyWorkspaceLifecycleProps) => {
  const reset = useCreateJourneyForm((state) => state.setResetJourney)

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  return children
}

export default CreateJourneyWorkspaceLifecycle
