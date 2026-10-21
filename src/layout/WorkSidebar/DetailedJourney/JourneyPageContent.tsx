'use client'

import { useQueryClient } from '@tanstack/react-query'

import FolderItem from '@/components/Workspace/FolderItem'
import RootTasks from '@/components/Workspace/RootTasks'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
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
    return <div className="px-5 py-6 text-sm text-text-muted">Invalid Journey resource</div>
  }

  return (
    <div>
      <nav aria-label="Journey sections" className="flex items-center gap-5 border-b border-border px-5 pt-4">
        <span className="border-b-2 border-primary pb-3 text-sm font-semibold text-text-primary">Tasks</span>
      </nav>

      <section className="space-y-3 px-5 py-4">
        {journey.folders.map((folder) => (
          <FolderItem
            createTaskHref={`/dashboard/home/journey/${journeyId}/folder/${folder.uid}/create-task`}
            folder={folder}
            key={folder.uid}
          />
        ))}
        <RootTasks
          createTaskHref={`/dashboard/home/journey/${encodeURIComponent(journey.uid)}/create-task`}
          journeyUid={journey.uid}
          tasks={journey.tasks}
        />
      </section>
    </div>
  )
}

export default JourneyPageContent
