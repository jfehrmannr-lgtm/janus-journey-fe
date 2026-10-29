'use client'

import { useRouter } from 'next/navigation'
import { useState, type KeyboardEvent, type ReactNode } from 'react'

import CreateResourceButton from '@/components/Button/CreateResourceButton'
import Icon from '@/components/Icon/Icon'
import InputCheck from '@/components/InputCheck/InputCheck'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'
import type { FolderFormValues } from '@/stores/workspaceFromStore'

import TaskItem from './TaskItem'
import Button from '../../../../components/Button/Button'

interface FolderItemBaseProps {
  children?: ReactNode
  createTaskHref?: string
  disableCollapse?: boolean
  isSelectingResources?: boolean
  initiallyExpanded?: boolean
  isSelected?: boolean
  onToggleSelection?: () => void
  onToggleTaskSelection?: (resourceId: string) => void
  selectedResource?: string[]
  showCompletionProgress?: boolean
  showCreateTaskAction?: boolean
}

interface PersistedFolderItemProps extends FolderItemBaseProps {
  folder: ApiFolderWithTasks
  pendingFolder?: never
}

interface PendingFolderItemProps extends FolderItemBaseProps {
  folder?: never
  isInvalid: boolean
  isValid?: boolean
  onRemove: () => void
  onSelect: () => void
  pendingFolder: FolderFormValues
}

type FolderItemProps = PersistedFolderItemProps | PendingFolderItemProps

/**
 * Renders an expandable folder card with its contextual task creation action.
 *
 * @param children - Optional content rendered before the existing folder tasks.
 * @param createTaskHref - Optional destination for the Create Task action.
 * @param disableCollapse - Whether to prevent collapsing and hide child Tasks.
 * @param folder - Persisted Folder and nested tasks displayed by the card.
 * @param initiallyExpanded - Whether the folder starts expanded.
 * @param isInvalid - Whether the pending Folder form has confirmed validation errors.
 * @param isValid - Whether the pending Folder form has passed validation.
 * @param onRemove - Callback invoked to remove a pending Folder form.
 * @param onSelect - Callback invoked when a pending Folder is selected.
 * @param pendingFolder - Pending Folder form displayed by the card.
 * @param showCompletionProgress - Whether to show completed versus total task count.
 * @param showCreateTaskAction - Whether to render the default Create Task action.
 * @returns A presentational expandable workspace folder.
 */
const FolderItem = (props: FolderItemProps) => {
  const {
    children,
    createTaskHref,
    disableCollapse = false,
    initiallyExpanded = true,
    showCompletionProgress = true,
    showCreateTaskAction = true,
    isSelectingResources = false,
    isSelected = false,
    onToggleSelection,
    onToggleTaskSelection,
    selectedResource = []
  } = props
  const pendingProps = 'pendingFolder' in props ? (props as PendingFolderItemProps) : undefined
  const persistedProps = 'folder' in props ? (props as PersistedFolderItemProps) : undefined
  const isPendingFolder = pendingProps !== undefined
  const folder = persistedProps?.folder
  const pendingFolder = pendingProps?.pendingFolder
  const folderName = pendingFolder?.name || folder?.name || 'New Folder'
  const tasks = folder?.tasks ?? []
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(
    !isPendingFolder && initiallyExpanded && (tasks.length > 0 || Boolean(children))
  )
  const completedTasks = tasks.filter((task) => task.state === 'completed' || task.state === 'discarded').length

  const handleHeaderClick = () => {
    if (isPendingFolder) {
      pendingProps?.onSelect()
      return
    }

    if (!disableCollapse) setIsExpanded((current) => !current)
  }

  const handlePendingKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    pendingProps?.onSelect()
  }

  const headerContent = (
    <>
      {isSelectingResources && (
        <span onClick={(event) => event.stopPropagation()}>
          <InputCheck
            aria-label={`Select ${folderName}`}
            checked={isSelected}
            className="mx-1 shrink-0"
            color="danger"
            onChange={onToggleSelection}
            size="sm"
          />
        </span>
      )}
      <Icon className="text-blue-700" icon="FolderOutlined" />
      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-text-strong">{folderName}</span>
      {!isPendingFolder && folder?.progress !== undefined && (
        <div className="w-20">
          <ProgressBar showPercent="none" progress={folder.progress.percentage} size="sm" />
        </div>
      )}
      <span className="text-xs text-text-muted">
        {isPendingFolder ? '0 / 0' : showCompletionProgress ? `${completedTasks} / ${tasks.length}` : tasks.length}
      </span>
    </>
  )

  return (
    <div className="overflow-hidden rounded-sm border-b border-l border-border-strong/50 hover:border-primary-soft">
      {isPendingFolder ? (
        <div
          aria-expanded="false"
          className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-slate-200`}
          onClick={handleHeaderClick}
          onKeyDown={handlePendingKeyDown}
          role="button"
          tabIndex={0}
        >
          {headerContent}
          <Button
            icon={<Icon icon="DeleteOutlined" />}
            variant="dotted"
            buttonSize="thin"
            color="neutral"
            onClick={(event) => {
              event.stopPropagation()
              pendingProps?.onRemove()
            }}
          />
        </div>
      ) : (
        <button
          aria-expanded={!disableCollapse && isExpanded}
          className={`cursor-pointer flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-primary-soft`}
          onClick={handleHeaderClick}
          type="button"
        >
          {headerContent}
          {!disableCollapse && (
            <Icon className="text-xs text-text-muted" icon={isExpanded ? 'DownOutlined' : 'RightOutlined'} />
          )}
        </button>
      )}

      {!isPendingFolder && !disableCollapse && isExpanded && (
        <div className="px-8">
          {showCreateTaskAction && !isSelectingResources && (
            <div className="border-t border-border-subtle py-2">
              <CreateResourceButton
                onClick={createTaskHref ? () => router.push(createTaskHref, { scroll: false }) : undefined}
                parentResourceType="folder"
                parentUid={folder?.uid ?? ''}
                resourceType="task"
              />
            </div>
          )}
          {children}
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <TaskItem
                  isImplicitlySelected={isSelected}
                  isSelectingResources={isSelectingResources}
                  isSelected={selectedResource.includes(task.uid)}
                  key={task.uid}
                  onToggleSelection={() => onToggleTaskSelection?.(task.uid)}
                  task={task}
                />
              )
            })
          ) : (
            <p className="border-t border-border-subtle px-3 py-4 text-sm text-text-muted">No tasks in this folder.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FolderItem
