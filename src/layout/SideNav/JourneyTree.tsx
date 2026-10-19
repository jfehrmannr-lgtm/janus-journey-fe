'use client'

import { useState } from 'react'

import Icon from '@/components/Icon/Icon'
import type { IconName } from '@/components/Icon/Icon'
import type { JourneyTreeData } from '@/types/navigation.type'
import type { TaskState } from '@/types/resource.type'
import useAppUiStore from '@/stores/appUiStore'
import { calculateProgress } from '@/utils/progress'

interface JourneyTreeProps {
  data: JourneyTreeData
}

const taskStateStyles: Record<TaskState, { icon: IconName; colorClass: string; colorIcon: string }> = {
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
    const stateStyle = taskStateStyles[task.state]

    return (
      <button
        className="flex min-h-10 w-full items-center gap-3 border-t border-border-subtle px-3 py-2 text-left transition-colors hover:bg-surface-subtle"
        key={task.uid}
        onClick={openWorkSidebar}
        type="button"
      >
        <Icon className={`shrink-0 ${stateStyle.colorIcon}`} icon={stateStyle.icon} />
        <span className={`min-w-0 flex-1  ${stateStyle.colorClass}`}>{task.name}</span>
        <span aria-hidden="true" className="shrink-0 text-text-subtle">
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
          <div className="overflow-hidden rounded-xl border border-border-subtle" key={folder.uid}>
            <button
              aria-expanded={isExpanded}
              className="flex w-full items-center gap-3 bg-surface-subtle px-3 py-3 text-left transition-colors hover:bg-slate-200"
              onClick={() => toggleFolder(folder.uid)}
              type="button"
            >
              <Icon className="text-blue-700" icon="FolderOutlined" />
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-text-strong">{folder.name}</span>
              <span className="text-xs text-text-muted">
                {resolvedTaskCount} / {folderProgress.total}
              </span>
              <Icon className="text-xs text-text-muted" icon={isExpanded ? 'DownOutlined' : 'RightOutlined'} />
            </button>
            {isExpanded && <div>{folderTasks.map(renderTask)}</div>}
          </div>
        )
      })}
      {directTasks.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Tasks</div>
          {directTasks.map(renderTask)}
        </div>
      )}
    </div>
  )
}

export default JourneyTree
