'use client'

import backgroundImage from '@/assets/janus-journey-background.png'
import Icon from '@/components/Icon/Icon'
import JourneyTree from '@/layout/SideNav/JourneyTree'
import type { JourneyTreeData } from '@/types/resources'

interface JourneyWorkspaceProps {
  data: JourneyTreeData
}

const temporaryProgress = {
  completedTasks: 6,
  totalTasks: 24,
  percentage: 25
}

/**
 * Renders the selected resource in the Journey workspace visual treatment.
 *
 * @param data - Resolved Journey or Folder data and its descendants.
 * @returns The selected Journey workspace content.
 */
const JourneyWorkspace = ({ data }: JourneyWorkspaceProps) => {
  const isJourney = data.rootResource.type === 'journey'

  return (
    <div className="min-h-full bg-white">
      <header
        className="relative flex min-h-44 flex-col justify-end overflow-hidden bg-cover bg-center px-5 py-5 text-white"
        style={{
          backgroundImage: `linear-gradient(to top, rgb(15 23 42 / 0.85), rgb(15 23 42 / 0.15)), url(${backgroundImage.src})`
        }}
      >
        <span className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg bg-slate-950/40 text-lg text-white">
          <Icon icon="EllipsisOutlined" />
        </span>
        <div className="relative">
          <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-white/15 text-white">
            <Icon icon={isJourney ? 'AppstoreOutlined' : 'FolderOutlined'} />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{data.rootResource.name}</h2>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-100">
            {data.rootResource.description || 'No description available.'}
          </p>
        </div>
      </header>

      {isJourney && (
        <section aria-label="Journey progress" className="border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/4 rounded-full bg-blue-500" />
            </div>
            <span className="whitespace-nowrap">
              {temporaryProgress.completedTasks} / {temporaryProgress.totalTasks} tasks
            </span>
            <span className="font-semibold text-slate-700">{temporaryProgress.percentage}%</span>
          </div>
        </section>
      )}

      <nav aria-label="Journey sections" className="flex items-center gap-5 border-b border-slate-200 px-5 pt-4">
        <span className="border-b-2 border-blue-600 pb-3 text-sm font-semibold text-slate-950">Tasks</span>
        <span className="pb-3 text-sm text-slate-500">Overview</span>
        <span className="pb-3 text-sm text-slate-500">Notes</span>
        <span className="pb-3 text-sm text-slate-500">Share</span>
      </nav>

      <section aria-labelledby="workspace-tasks" className="px-5 py-4">
        <h3 className="sr-only" id="workspace-tasks">
          Tasks
        </h3>
        <JourneyTree data={data} />
      </section>
    </div>
  )
}

export default JourneyWorkspace
