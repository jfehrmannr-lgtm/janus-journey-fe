'use client'

import { useRouter } from 'next/navigation'
import { useState, type ReactNode } from 'react'

import CreateResourceButton from '@/components/Button/CreateResourceButton'
import Icon from '@/components/Icon/Icon'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'

import TaskItem from './TaskItem'

interface FolderItemProps {
  children?: ReactNode
  createTaskHref?: string
  folder: ApiFolderWithTasks
  initiallyExpanded?: boolean
  showCompletionProgress?: boolean
  showCreateTaskAction?: boolean
}

/**
 * Renders an expandable folder card with its contextual task creation action.
 *
 * @param children - Optional content rendered before the existing folder tasks.
 * @param createTaskHref - Optional destination for the Create Task action.
 * @param folder - Folder and nested tasks displayed by the card.
 * @param initiallyExpanded - Whether the folder starts expanded.
 * @param showCompletionProgress - Whether to show completed versus total task count.
 * @param showCreateTaskAction - Whether to render the default Create Task action.
 * @returns A presentational expandable workspace folder.
 */
const FolderItem = ({
  children,
  createTaskHref,
  folder,
  initiallyExpanded = true,
  showCompletionProgress = true,
  showCreateTaskAction = true
}: FolderItemProps) => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded && (folder.tasks.length > 0 || Boolean(children)))
  const completedTasks = folder.tasks.filter((task) => task.state === 'completed' || task.state === 'discarded').length

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
          {showCompletionProgress ? `${completedTasks} / ${folder.tasks.length}` : folder.tasks.length}
        </span>
        <Icon className="text-xs text-text-muted" icon={isExpanded ? 'DownOutlined' : 'RightOutlined'} />
      </button>

      {isExpanded && (
        <div>
          {showCreateTaskAction && (
            <div className="border-t border-border-subtle px-3 py-2">
              <CreateResourceButton
                onClick={createTaskHref ? () => router.push(createTaskHref, { scroll: false }) : undefined}
                parentResourceType="folder"
                parentUid={folder.uid}
                resourceType="task"
              />
            </div>
          )}
          {children}
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
