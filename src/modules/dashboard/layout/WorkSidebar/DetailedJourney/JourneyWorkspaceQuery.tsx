'use client'

import type { ReactNode } from 'react'

interface JourneyWorkspaceQueryProps {
  children: ReactNode
}

const JourneyWorkspaceQuery = ({ children }: JourneyWorkspaceQueryProps) => {
  return <>{children}</>
}

export default JourneyWorkspaceQuery
