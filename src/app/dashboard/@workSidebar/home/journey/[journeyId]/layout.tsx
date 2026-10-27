import { Suspense, type ReactNode } from 'react'
import DetailedWorkspaceSkeleton from '@/modules/dashboard/layout/WorkSidebar/DetailedWorkspaceSkeleton'
import JourneyContent from './JourneyContent'

interface JourneyLayoutProps {
  children: ReactNode
  params: Promise<{ journeyId: string }>
}

// Este layout ya no espera la respuesta del BFF.
const JourneyLayout = async ({ children, params }: JourneyLayoutProps) => {
  const { journeyId } = await params

  return (
    <Suspense key={journeyId} fallback={<DetailedWorkspaceSkeleton />}>
      <JourneyContent journeyId={journeyId}>{children}</JourneyContent>
    </Suspense>
  )
}

export default JourneyLayout
