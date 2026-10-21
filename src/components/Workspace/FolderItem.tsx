'use client'

import Link from 'next/link'
import { useState } from 'react'

import CreateResourceButton from '@/components/CreateResourceButton/CreateResourceButton'
import Icon from '@/components/Icon/Icon'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'

import TaskItem from './TaskItem'

interface FolderItemProps {
  createTaskHref?: string
  folder: ApiFolderWithTasks
  initiallyExpanded?: boolean
}

/**
 * Renders an expandable folder card with its contextual task creation action.
 *
 * @param createTaskHref - Optional destination for the Create Task action.
 * @param folder - Folder and nested tasks displayed by the card.
 * @param initiallyExpanded - Whether the folder starts expanded.
 * @returns A presentational expandable workspace folder.
 */
const FolderItem = ({ createTaskHref, folder, initiallyExpanded = true }: FolderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded && folder.tasks.length > 0)
  const completedTasks = folder.tasks.filter((task) => task.state === 'completed' || task.state === 'discarded').length

  const createTaskAction = createTaskHref ? (
    <Link
      className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-dotted border-border-subtle px-3 text-sm font-semibold text-text-muted transition-colors hover:border-primary/50 hover:text-primary"
      href={createTaskHref}
    >
      <Icon icon="CheckSquareOutlined" />
      Create Task
    </Link>
  ) : (
    <CreateResourceButton parentResourceType="folder" parentUid={folder.uid} resourceType="task" />
  )

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle">
      <button
        aria-expanded={isExpanded}
        className="flex w-full items-center gap-3 bg-surface-subtle px-3 py-3 text-left transition-colors hover:bg-slate-200"
        onClick={() => setIsExpanded((current) => !current)}
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
          <div className="border-t border-border-subtle px-3 py-2">{createTaskAction}</div>
          {folder.tasks.length > 0 ? (
            folder.tasks.map((task) => <TaskItem key={task.uid} task={task} />)
          ) : (
            <p className="border-t border-border-subtle px-3 py-4 text-sm text-text-muted">No tasks in this folder.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FolderItem
