'use client'

import type { ChangeEvent } from 'react'

import Icon from '@/components/Icon/Icon'
import type { CreateJourneyTaskDraft, CreateJourneyTaskState } from '@/types/createJourney'

interface TaskFormProps {
  label?: string
  onChange: (task: CreateJourneyTaskDraft) => void
  onRemove?: () => void
  removeLabel?: string
  task: CreateJourneyTaskDraft
}

const taskStates: CreateJourneyTaskState[] = ['pending', 'in-progress', 'in-pause', 'completed', 'discarded']

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
        <input
          aria-label={`${label} name`}
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10 sm:col-span-2"
          maxLength={255}
          onChange={handleTextChange('name')}
          placeholder="Task name"
          value={task.name}
        />
        <textarea
          aria-label={`${label} description`}
          className="min-h-20 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10 sm:col-span-2"
          onChange={handleTextChange('description')}
          placeholder="Optional Task description"
          value={task.description}
        />
        <select
          aria-label={`${label} state`}
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-strong outline-none focus:border-focus focus:ring-4 focus:ring-focus/10"
          onChange={(event) => onChange({ ...task, state: event.target.value as CreateJourneyTaskState })}
          value={task.state}
        >
          {taskStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <label className="flex h-10 items-center gap-2 text-sm text-text-body">
          <input
            checked={task.isVisible}
            className="size-4 rounded border-border-strong text-primary focus:ring-focus"
            onChange={(event) => onChange({ ...task, isVisible: event.target.checked })}
            type="checkbox"
          />
          Visible Task
        </label>
      </div>
    </div>
  )
}

export default TaskForm
