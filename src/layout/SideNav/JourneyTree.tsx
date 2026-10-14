'use client'

import { useState } from 'react'

import Icon from '@/components/Icon/Icon'
import type { IconName } from '@/components/Icon/Icon'
import type { JourneyTreeData, TaskStatus } from '@/types/resources'
import useAppUiStore from '@/stores/appUiStore'
import { calculateProgress } from '@/utils/progress'

interface JourneyTreeProps {
  data: JourneyTreeData
}

const taskStatusStyles: Record<TaskStatus, { icon: IconName; colorClass: string; colorIcon: string }> = {
  completed: {
    icon: 'CheckCircleOutlined',
    colorIcon: 'text-task-completed-foreground!',
    colorClass: 'text-task-completed-foreground'
  },
  discarded: {
    icon: 'CloseCircleOutlined',
    colorIcon: 'text-task-discarded-foreground!',
    colorClass: 'text-task-discarded-foreground'
  },
  pending: {
    icon: 'ClockCircleOutlined',
    colorIcon: 'text-task-pending-foreground!',
    colorClass: 'text-task-pending-foreground'
  },
  'in-progress': {
    icon: 'SyncOutlined',
    colorIcon: 'text-task-in-progress-foreground!',
    colorClass: 'text-task-in-progress-foreground'
  },
  'in-pause': {
    icon: 'PauseCircleOutlined',
    colorIcon: 'text-task-in-pause-foreground!',
    colorClass: 'text-task-in-pause-foreground'
  }
}

/**
 * Renders resolved folders and tasks as expandable Journey workspace sections.
 *
 * @param data - Selected Journey tree resources.
 * @returns The flat Journey tree content for the SideNav.
 */
const JourneyTree = ({ data }: JourneyTreeProps) => {
  const [expandedFolderUids, setExpandedFolderUids] = useState<string[]>(() => data.folders.map((folder) => folder.uid))
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
    const statusStyle = taskStatusStyles[task.status]

    return (
      <button
        className="flex min-h-10 w-full items-center gap-3 border-t border-slate-100 px-3 py-2 text-left transition-colors hover:bg-slate-50"
        key={task.uid}
        onClick={openWorkSidebar}
        type="button"
      >
        <Icon className={`shrink-0 ${statusStyle.colorIcon}`} icon={statusStyle.icon} />
        <span className={`min-w-0 flex-1  ${statusStyle.colorClass}`}>{task.name}</span>
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
        const folderProgress = calculateProgress(folderTasks)
        const resolvedTaskCount = folderProgress.completed + folderProgress.discarded
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
                {resolvedTaskCount} / {folderProgress.total}
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
