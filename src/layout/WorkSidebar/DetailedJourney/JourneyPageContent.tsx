'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ApiJourneyWithResources } from '@/types/resource-api.type'
import { useQueryClient } from '@tanstack/react-query'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import CreateResourceButton from '@/components/CreateResourceButton/CreateResourceButton'
import Icon from '@/components/Icon/Icon'

interface JourneyPageContentProps {
  journeyId: string
}

const JourneyPageContent = ({ journeyId }: JourneyPageContentProps) => {
  const queryClient = useQueryClient()
  const [expandedFolderUids, setExpandedFolderUids] = useState<string[]>([])

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
        <CreateResourceButton parentResourceType="journey" parentUid={journey.uid} resourceType="folder" />

        {journey.folders.map((folder) => {
          const isExpanded = expandedFolderUids.includes(folder.uid)
          const completedTasks = folder.tasks.filter(
            (task) => task.state === 'completed' || task.state === 'discarded'
          ).length

          return (
            <div className="overflow-hidden rounded-xl border border-border-subtle" key={folder.uid}>
              <button
                aria-expanded={isExpanded}
                className="flex w-full items-center gap-3 bg-surface-subtle px-3 py-3 text-left transition-colors hover:bg-slate-200"
                onClick={() =>
                  setExpandedFolderUids((current) =>
                    isExpanded ? current.filter((uid) => uid !== folder.uid) : [...current, folder.uid]
                  )
                }
                type="button"
              >
                <Icon className="text-blue-700" icon="FolderOutlined" />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-text-strong">{folder.name}</span>
                <span className="text-xs text-text-muted">
                  {completedTasks} / {folder.tasks.length}
                </span>
                <Icon className="text-xs text-text-muted" icon={isExpanded ? 'DownOutlined' : 'RightOutlined'} />
              </button>
              {isExpanded && (
                <div>
                  <div className="border-t border-border-subtle px-3 py-2">
                    <Link
                      className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-dotted border-border-subtle px-3 text-sm font-semibold text-text-muted transition-colors hover:border-primary/50 hover:text-primary"
                      href={`/dashboard/home/journey/${journeyId}/folder/${folder.uid}/create-task`}
                      prefetch={false}
                    >
                      <Icon icon="CheckSquareOutlined" />
                      Create Task
                    </Link>
                  </div>
                  {folder.tasks.map((task) => (
                    <div
                      className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2"
                      key={task.uid}
                    >
                      <Icon className="shrink-0 text-task-pending-foreground" icon="ClockCircleOutlined" />
                      <span className="min-w-0 flex-1 text-text-body">{task.name}</span>
                      <Icon className="text-text-subtle" icon="EllipsisOutlined" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Tasks</div>
          <div className="border-t border-border-subtle px-3 py-2">
            <CreateResourceButton parentResourceType="journey" parentUid={journey.uid} resourceType="task" />
          </div>
          {journey.tasks.map((task) => (
            <div className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2" key={task.uid}>
              <Icon className="shrink-0 text-task-pending-foreground" icon="ClockCircleOutlined" />
              <span className="min-w-0 flex-1 text-text-body">{task.name}</span>
              <Icon className="text-text-subtle" icon="EllipsisOutlined" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default JourneyPageContent
