'use client'

import { useEffect, type ReactNode } from 'react'

import useAppUiStore from '@/stores/appUiStore'

interface WorkspaceLifecycleProps {
  children: ReactNode
}

/**
 * Cleans up generic resource-selection state when the workspace leaves the tree.
 *
 * @param children - Workspace content rendered inside the lifecycle boundary.
 * @returns The unchanged workspace content.
 */
const WorkspaceLifecycle = ({ children }: WorkspaceLifecycleProps) => {
  const cancelResourceSelection = useAppUiStore((state) => state.cancelResourceSelection)

  useEffect(() => {
    return () => {
      cancelResourceSelection()
    }
  }, [cancelResourceSelection])

  return children
}

export default WorkspaceLifecycle
