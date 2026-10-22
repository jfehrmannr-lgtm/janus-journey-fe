'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import CreateResourceButton from '@/components/Button/CreateResourceButton'
import FolderItem from '@/components/Workspace/FolderItem'
import RootTasks from '@/components/Workspace/RootTasks'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'

interface JourneyPageContentProps {
  journeyId: string
}

const JourneyPageContent = ({ journeyId }: JourneyPageContentProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )

  // El hook debe devolver ApiJourneyWithResources para acceder a folders.
  if (!journey || !('folders' in journey)) {
    return <div className="px-5 py-6 text-sm text-text-muted">Invalid Journey resource</div>
  }

  return (
    <div>
      <nav
        aria-label="Journey sections"
        className="flex sticky top-0 bg-white items-center gap-5 border-b border-border px-5 z-20"
      >
        <div className="flex-1 pt-3">
          <div className="border-b-2 border-primary pb-3 text-sm font-semibold text-text-primary inline-block">
            Tasks
          </div>
        </div>
      </nav>

      <section className="space-y-3 px-5 py-4">
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Folders</div>
          <div className="border-t border-border-subtle px-3 pt-2">
            <CreateResourceButton
              onClick={() =>
                router.push(`/dashboard/home/journey/${encodeURIComponent(journey.uid)}/create-folder`, {
                  scroll: false
                })
              }
              parentResourceType="journey"
              parentUid={journey.uid}
              resourceType="folder"
            />
          </div>
          <div className="space-y-3 p-3">
            {journey.folders.map((folder) => (
              <FolderItem
                createTaskHref={`/dashboard/home/journey/${journeyId}/folder/${folder.uid}/create-task`}
                folder={folder}
                key={folder.uid}
              />
            ))}
          </div>
        </div>
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
