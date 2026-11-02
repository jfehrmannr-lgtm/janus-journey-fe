'use client'

import type { KeyboardEvent, ReactNode } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Icon, { type IconName } from '@/components/Icon/Icon'
import InputCheck from '@/components/InputCheck/InputCheck'
import type { ApiTask, ApiTaskState } from '@/types/resource-api.type'
import type { TaskFormValues } from '@/stores/workspaceFromStore'
import { patchTaskAction } from '@/app/dashboard/@workSidebar/home/journey/[journeyId]/actions'
import Button from '../../../../components/Button/Button'
import Dropdown from '@/components/Dropdown/Dropdown'
import useAppUiStore from '@/stores/appUiStore'

interface TaskItemBaseProps {
  children?: ReactNode
}

interface PersistedTaskItemProps extends TaskItemBaseProps {
  isImplicitlySelected?: boolean
  isSelectingResources?: boolean
  isSelected?: boolean
  onToggleSelection?: () => void
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

const taskStateStyles: Record<ApiTaskState, { className: string; icon: IconName; label: string }> = {
  completed: { className: 'text-task-completed-foreground!', icon: 'CheckCircleOutlined', label: 'Completed' },
  discarded: { className: 'text-task-discarded-foreground!', icon: 'CloseCircleOutlined', label: 'Discarded' },
  pending: { className: 'text-task-pending-foreground!', icon: 'ClockCircleOutlined', label: 'Pending' },
  'in-progress': { className: 'text-task-in-progress-foreground!', icon: 'SyncOutlined', label: 'In progress' },
  'in-pause': { className: 'text-task-in-pause-foreground!', icon: 'PauseCircleOutlined', label: 'In pause' }
}

const taskStates: ApiTaskState[] = ['pending', 'in-progress', 'in-pause', 'completed', 'discarded']

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
  const isSelectingResources = persistedProps?.isSelectingResources ?? false
  const isSelected = persistedProps?.isSelected ?? false
  const isImplicitlySelected = persistedProps?.isImplicitlySelected ?? false
  const pendingTask = pendingProps?.pendingTask
  const taskName = pendingTask?.name || task?.name || 'New Task'
  const queryClient = useQueryClient()
  const closeDropdown = useAppUiStore((state) => state.closeDropdown)

  const updateTaskMutation = useMutation({
    mutationFn: (state: ApiTaskState) => patchTaskAction(task?.uid ?? '', { quick: true, state }),
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update Task state.')
      console.error(error)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['navigation'] })
      void queryClient.invalidateQueries({ queryKey: ['dashboard', 'home'] })
      toast.success('Task state updated.')
    }
  })

  const currentState = updateTaskMutation.data?.state ?? task?.state ?? pendingTask?.state ?? 'pending'
  const stateStyle = taskStateStyles[currentState]

  const handleStateSelect = (nextState: ApiTaskState) => {
    if (!task || updateTaskMutation.isPending || nextState === currentState) {
      closeDropdown()
      return
    }

    closeDropdown()
    updateTaskMutation.mutate(nextState)
  }
  const rowClassName = isPendingTask
    ? pendingProps?.isInvalid
      ? 'bg-danger-surface'
      : pendingProps?.isValid
        ? 'bg-task-completed'
        : ''
    : ''

  const handlePendingKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    pendingProps?.onSelect()
  }

  const content = (
    <>
      {isSelectingResources && (
        <span onClick={(event) => event.stopPropagation()}>
          <InputCheck
            aria-label={`Select ${taskName}`}
            checked={isSelected || isImplicitlySelected}
            className="mx-1 shrink-0"
            color="danger"
            disabled={isImplicitlySelected}
            onChange={persistedProps?.onToggleSelection}
            size="sm"
          />
        </span>
      )}
      <span onClick={(event) => event.stopPropagation()}>
        <Dropdown
          disabled={updateTaskMutation.isPending}
          id={`task-state-selector-${props.task?.uid ?? pendingProps?.pendingTask.id}`}
          trigger={
            <Button
              className="px-2!"
              buttonSize="normal"
              disabled={updateTaskMutation.isPending}
              variant="outlined"
              color="neutral"
              icon={<Icon className={`shrink-0 ${stateStyle.className}`} icon={stateStyle.icon} />}
            />
          }
        >
          <div className="flex flex-col gap-0.5">
            {taskStates.map((nextState) => {
              const nextStateStyle = taskStateStyles[nextState]

              return (
                <Button
                  aria-label={`Set Task state to ${nextStateStyle.label}`}
                  className="justify-start! border-transparent! px-3! text-left! text-sm! text-text-body hover:bg-surface-subtle"
                  disabled={updateTaskMutation.isPending}
                  icon={<Icon className={nextStateStyle.className} icon={nextStateStyle.icon} />}
                  key={nextState}
                  label={nextStateStyle.label}
                  onClick={() => handleStateSelect(nextState)}
                  size="full"
                  type="button"
                  variant="outlined"
                />
              )
            })}
          </div>
        </Dropdown>
      </span>

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
        <Button
          buttonSize="thin"
          className="shrink-0 text-text-subtle transition-colors hover:text-text-body"
          color="neutral"
          icon={<Icon icon="DeleteOutlined" />}
          onClick={(event) => {
            event.stopPropagation()
            pendingProps?.onRemove()
          }}
          size="nm"
          title={`Remove ${taskName}`}
          type="button"
          variant="outlined"
        />
      </div>
    )
  }

  return (
    <div
      className={`flex min-h-10 items-center gap-3 border-t border-border-subtle px-3 py-2 ${
        isSelectingResources && (isSelected || isImplicitlySelected) ? 'bg-primary-soft/60' : ''
      }`}
    >
      {content}
      {!isSelectingResources && (
        <button
          aria-label={`Actions for ${taskName}`}
          className="shrink-0 text-text-subtle transition-colors hover:text-text-body"
          type="button"
        >
          <Icon icon="EllipsisOutlined" />
        </button>
      )}
    </div>
  )
}

export default TaskItem
