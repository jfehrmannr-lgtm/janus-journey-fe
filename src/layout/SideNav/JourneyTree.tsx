'use client'

import { useState } from 'react'

import Icon from '@/components/Icon/Icon'
import type { JourneyTreeData } from '@/types/resources'
import useAppUiStore from '@/stores/appUiStore'

interface JourneyTreeProps {
  data: JourneyTreeData
}

/**
 * Renders resolved folders and tasks as expandable Journey workspace sections.
 *
 * @param data - Selected Journey tree resources.
 * @returns The flat Journey tree content for the SideNav.
 */
const JourneyTree = ({ data }: JourneyTreeProps) => {
  const [expandedFolderUids, setExpandedFolderUids] = useState<string[]>(() =>
    data.folders.slice(0, 2).map((folder) => folder.uid)
  )
  const openWorkSidebar = useAppUiStore((state) => state.openWorkSidebar)
  const directTasks = data.tasks.filter((task) => task.parentUid === data.rootResourceUid)

  const toggleFolder = (folderUid: string) => {
    setExpandedFolderUids((currentFolderUids) =>
      currentFolderUids.includes(folderUid)
        ? currentFolderUids.filter((currentFolderUid) => currentFolderUid !== folderUid)
        : [...currentFolderUids, folderUid]
    )
  }

  const renderTask = (task: JourneyTreeData['tasks'][number]) => {
    const isComplete = task.status === 'completed' || task.status === 'complete' || task.status === 'discarded'

    return (
      <button
        className="flex min-h-10 w-full items-center gap-3 border-t border-slate-100 px-3 py-2 text-left transition-colors hover:bg-slate-50"
        key={task.uid}
        onClick={openWorkSidebar}
        type="button"
      >
        {isComplete ? (
          <Icon className="shrink-0 text-emerald-500" icon="CheckCircleOutlined" />
        ) : (
          <Icon className="shrink-0 text-slate-300" icon="MinusCircleOutlined" />
        )}
        <span className={`min-w-0 flex-1 truncate text-sm ${isComplete ? 'text-slate-500' : 'text-slate-700'}`}>
          {task.name}
        </span>
        <span aria-hidden="true" className="shrink-0 text-slate-400">
          <Icon icon="EllipsisOutlined" />
        </span>
      </button>
    )
  }

  return (
    <div className="space-y-3 py-3">
      {data.folders.map((folder) => {
        const folderTasks = data.tasks.filter((task) => task.parentUid === folder.uid)
        const completedTaskCount = folderTasks.filter(
          (task) => task.status === 'completed' || task.status === 'complete' || task.status === 'discarded'
        ).length
        const isExpanded = expandedFolderUids.includes(folder.uid)

        return (
          <div className="overflow-hidden rounded-xl border border-slate-100" key={folder.uid}>
            <button
              aria-expanded={isExpanded}
              className="flex w-full items-center gap-3 bg-slate-50 px-3 py-3 text-left transition-colors hover:bg-slate-100"
              onClick={() => toggleFolder(folder.uid)}
              type="button"
            >
              <Icon className="text-blue-700" icon="FolderOutlined" />
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{folder.name}</span>
              <span className="text-xs text-slate-500">
                {completedTaskCount} / {folderTasks.length}
              </span>
              <Icon className="text-xs text-slate-500" icon={isExpanded ? 'DownOutlined' : 'RightOutlined'} />
            </button>
            {isExpanded && <div>{folderTasks.map(renderTask)}</div>}
          </div>
        )
      })}
      {directTasks.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-100">
          <div className="bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800">Tasks</div>
          {directTasks.map(renderTask)}
        </div>
      )}
    </div>
  )
}

export default JourneyTree
