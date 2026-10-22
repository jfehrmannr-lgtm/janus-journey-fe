import type { KeyboardEvent, ReactNode } from 'react'

import Icon, { type IconName } from '@/components/Icon/Icon'
import type { ApiTask, ApiTaskState } from '@/types/resource-api.type'
import type { TaskFormValues } from '@/stores/workspaceFromStore'

interface TaskItemBaseProps {
  children?: ReactNode
}

interface PersistedTaskItemProps extends TaskItemBaseProps {
  task: ApiTask
  pendingTask?: never
}

interface PendingTaskItemProps extends TaskItemBaseProps {
  isInvalid: boolean
  isValid?: boolean
  onRemove: () => void
  onSelect: () => void
  pendingTask: TaskFormValues
  task?: never
}

type TaskItemProps = PersistedTaskItemProps | PendingTaskItemProps

const taskStateStyles: Record<ApiTaskState, { icon: IconName; className: string }> = {
  completed: { icon: 'CheckCircleOutlined', className: 'text-task-completed-foreground' },
  discarded: { icon: 'CloseCircleOutlined', className: 'text-task-discarded-foreground' },
  pending: { icon: 'ClockCircleOutlined', className: 'text-task-pending-foreground' },
  'in-progress': { icon: 'SyncOutlined', className: 'text-task-in-progress-foreground' },
  'in-pause': { icon: 'PauseCircleOutlined', className: 'text-task-in-pause-foreground' }
}

/**
 * Renders one persisted Task row or one pending Task form item.
 *
 * @param task - Persisted Task displayed by the row.
 * @param pendingTask - Pending Task form displayed by the row.
 * @param isInvalid - Whether the pending Task has confirmed validation errors.
 * @param isValid - Whether the pending Task has passed validation.
 * @param onRemove - Callback invoked to remove a pending Task.
 * @param onSelect - Callback invoked when a pending Task is selected.
 * @returns A workspace Task item.
 */
const TaskItem = (props: TaskItemProps) => {
  const pendingProps = 'pendingTask' in props ? (props as PendingTaskItemProps) : undefined
  const persistedProps = 'task' in props ? (props as PersistedTaskItemProps) : undefined
  const isPendingTask = pendingProps !== undefined
  const task = persistedProps?.task
  const pendingTask = pendingProps?.pendingTask
  const taskName = pendingTask?.name || task?.name || 'New Task'
  const stateStyle = task ? taskStateStyles[task.state] : taskStateStyles.pending
  const rowClassName = isPendingTask
    ? pendingProps?.isInvalid
      ? 'bg-danger-surface'
      : pendingProps?.isValid
        ? 'bg-task-completed'
        : 'bg-surface'
    : 'bg-surface'

  const handlePendingKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    pendingProps?.onSelect()
  }

  const content = (
    <>
      <Icon className={`shrink-0 ${stateStyle.className}`} icon={stateStyle.icon} />
      <span className="min-w-0 flex-1 text-text-body">{taskName}</span>
    </>
  )

  if (isPendingTask) {
    return (
      <div
        className={`flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2 ${rowClassName}`}
        onClick={() => pendingProps?.onSelect()}
        onKeyDown={handlePendingKeyDown}
        role="button"
        tabIndex={0}
      >
        {content}
        <button
          aria-label={`Remove ${taskName}`}
          className="shrink-0 rounded-lg p-1 text-text-subtle transition-colors hover:bg-danger-surface hover:text-danger-foreground focus:outline-none focus:ring-4 focus:ring-focus/20"
          onClick={(event) => {
            event.stopPropagation()
            pendingProps?.onRemove()
          }}
          type="button"
        >
          <Icon icon="DeleteOutlined" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2">
      {content}
      <button
        aria-label={`Actions for ${taskName}`}
        className="shrink-0 text-text-subtle transition-colors hover:text-text-body"
        type="button"
      >
        <Icon icon="EllipsisOutlined" />
      </button>
    </div>
  )
}

export default TaskItem
