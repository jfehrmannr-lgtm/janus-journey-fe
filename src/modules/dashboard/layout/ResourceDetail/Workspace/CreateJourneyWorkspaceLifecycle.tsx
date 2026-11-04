'use client'

import { useEffect, type ReactNode } from 'react'

import { useCreateFolderForm, useCreateJourneyForm, useCreateTaskForm } from '@/stores/workspaceFromStore'

interface CreateJourneyWorkspaceLifecycleProps {
  children: ReactNode
}

/**
 * Resets all resource creation drafts when the creation workspace leaves the tree.
 *
 * @param children - Create Journey workspace content.
 * @returns The unchanged workspace content.
 */
const CreateJourneyWorkspaceLifecycle = ({ children }: CreateJourneyWorkspaceLifecycleProps) => {
  const resetJourney = useCreateJourneyForm((state) => state.setResetJourney)
  const resetFolder = useCreateFolderForm((state) => state.setResetFolder)
  const resetTask = useCreateTaskForm((state) => state.setResetTaskForm)

  useEffect(() => {
    return () => {
      resetJourney()
      resetFolder()
      resetTask()
    }
  }, [resetFolder, resetJourney, resetTask])

  return children
}

export default CreateJourneyWorkspaceLifecycle
