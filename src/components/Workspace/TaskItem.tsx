import Icon from '@/components/Icon/Icon'
import type { IconName } from '@/components/Icon/Icon'
import type { ApiTask, ApiTaskState } from '@/types/resource-api.type'

interface TaskItemProps {
  task: ApiTask
}

const taskStateStyles: Record<ApiTaskState, { icon: IconName; className: string }> = {
  completed: { icon: 'CheckCircleOutlined', className: 'text-task-completed-foreground' },
  discarded: { icon: 'CloseCircleOutlined', className: 'text-task-discarded-foreground' },
  pending: { icon: 'ClockCircleOutlined', className: 'text-task-pending-foreground' },
  'in-progress': { icon: 'SyncOutlined', className: 'text-task-in-progress-foreground' },
  'in-pause': { icon: 'PauseCircleOutlined', className: 'text-task-in-pause-foreground' }
}

/**
 * Renders one workspace task row using the task state icon and action affordance.
 *
 * @param task - Task displayed by the row.
 * @returns A presentational workspace task item.
 */
const TaskItem = ({ task }: TaskItemProps) => {
  const stateStyle = taskStateStyles[task.state]

  return (
    <div className="flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2">
      <Icon className={`shrink-0 ${stateStyle.className}`} icon={stateStyle.icon} />
      <span className="min-w-0 flex-1 text-text-body">{task.name}</span>
      <button
        aria-label={`Actions for ${task.name}`}
        className="shrink-0 text-text-subtle transition-colors hover:text-text-body"
        type="button"
      >
        <Icon icon="EllipsisOutlined" />
      </button>
    </div>
  )
}

export default TaskItem
