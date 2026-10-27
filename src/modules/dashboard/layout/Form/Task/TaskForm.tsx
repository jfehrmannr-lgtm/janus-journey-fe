'use client'

import type { ChangeEvent, ReactNode } from 'react'

import Icon from '@/components/Icon/Icon'
import Input from '@/components/Input/Input'
import InputCheck from '@/components/InputCheck/InputCheck'
import SelectOption from '@/components/SelectOption/SelectOption'
import type { CreateJourneyTaskDraft, CreateJourneyTaskState } from '@/types/createJourney'

interface TaskFormProps {
  label?: string
  onChange: (task: CreateJourneyTaskDraft) => void
  onRemove?: () => void
  removeLabel?: string
  task: CreateJourneyTaskDraft
}

const taskStates: Array<{ label: string; value: CreateJourneyTaskState; icon: ReactNode }> = [
  {
    icon: <Icon className="text-task-pending-foreground" icon="ClockCircleOutlined" />,
    label: 'Pending',
    value: 'pending'
  },
  {
    icon: <Icon className="text-task-in-progress-foreground" icon="SyncOutlined" />,
    label: 'In progress',
    value: 'in-progress'
  },
  {
    icon: <Icon className="text-task-in-pause-foreground" icon="PauseCircleOutlined" />,
    label: 'In pause',
    value: 'in-pause'
  },
  {
    icon: <Icon className="text-task-completed-foreground" icon="CheckCircleOutlined" />,
    label: 'Completed',
    value: 'completed'
  },
  {
    icon: <Icon className="text-task-discarded-foreground" icon="CloseCircleOutlined" />,
    label: 'Discarded',
    value: 'discarded'
  }
]

/**
 * Renders one controlled Task editor for a root or Folder Task.
 *
 * @param label - Heading used for the Task editor.
 * @param onChange - Callback receiving the updated Task value.
 * @param onRemove - Optional callback for removing the Task from its parent collection.
 * @param removeLabel - Accessible label for the remove control.
 * @param task - Controlled Task form value.
 * @returns A reusable controlled Task form.
 */
const TaskForm = ({ label = 'Task', onChange, onRemove, removeLabel = 'Remove Task', task }: TaskFormProps) => {
  const handleTextChange =
    (field: 'name' | 'description') => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...task, [field]: event.target.value })
    }

  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className="text-primary-foreground" icon="CheckCircleOutlined" />
          <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">{label}</span>
        </div>
        {onRemove && (
          <button
            aria-label={removeLabel}
            className="flex size-7 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-danger-surface hover:text-danger-foreground focus:outline-none focus:ring-4 focus:ring-focus/20"
            onClick={onRemove}
            type="button"
          >
            <Icon icon="CloseOutlined" />
          </button>
        )}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            aria-label={`${label} name`}
            className="h-10"
            maxLength={255}
            onChange={handleTextChange('name')}
            placeholder="Task name"
            value={task.name}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            aria-label={`${label} description`}
            className="min-h-20"
            onChange={handleTextChange('description')}
            placeholder="Optional Task description"
            type="textarea"
            value={task.description}
          />
        </div>
        <SelectOption
          aria-label={`${label} state`}
          className="h-10"
          isSearchable={false}
          onChange={(event) => onChange({ ...task, state: event.target.value as CreateJourneyTaskState })}
          options={taskStates}
          value={task.state}
        />
        <InputCheck
          checked={task.isVisible}
          className="h-10"
          label="Visible Task"
          onChange={(event) => onChange({ ...task, isVisible: event.target.checked })}
        />
      </div>
    </div>
  )
}

export default TaskForm
