'use client'

import Link from 'next/link'

import { ApiJourneyWithResources } from '@/types/resource-api.type'
import { useQueryClient } from '@tanstack/react-query'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'

interface JourneyPageContentProps {
  journeyId: string
}

const JourneyPageContent = ({ journeyId }: JourneyPageContentProps) => {
  const queryClient = useQueryClient()

  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )

  // El hook debe devolver ApiJourneyWithResources para acceder a folders.
  if (!journey || !('folders' in journey)) {
    return <div>Invalid Journey resource</div>
  }

  return (
    <div className="flex flex-col gap-3">
      <h2>{journey.name}</h2>

      {journey.folders.map((folder) => (
        <div key={folder.uid} className="flex items-center justify-between gap-2">
          <span>{folder.name}</span>

          <Link
            key={folder.uid}
            href={`/dashboard/home/journey/${journeyId}/folder/${folder.uid}/create-task`}
            prefetch={false}
          >
            Create Task
          </Link>
        </div>
      ))}
    </div>
  )
}

export default JourneyPageContent
