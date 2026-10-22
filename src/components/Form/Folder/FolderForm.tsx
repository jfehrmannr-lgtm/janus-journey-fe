'use client'

import Icon from '@/components/Icon/Icon'
import TaskForm from '@/components/Form/Task/TaskForm'
import Input from '@/components/Input/Input'
import type { CreateJourneyFolderDraft, CreateJourneyTaskDraft } from '@/types/createJourney'
import { createEmptyTask } from '@/utils/createJourneyPayload'

interface FolderFormProps {
  folder: CreateJourneyFolderDraft
  folderIndex?: number
  onChange: (folder: CreateJourneyFolderDraft) => void
  onRemove?: () => void
}

/**
 * Renders one controlled Folder editor and its nested controlled Tasks.
 *
 * @param folder - Controlled Folder form value.
 * @param folderIndex - Optional display position for the Folder.
 * @param onChange - Callback receiving the updated Folder and nested Tasks.
 * @param onRemove - Optional callback for removing the Folder from its parent collection.
 * @returns A reusable controlled Folder form.
 */
const FolderForm = ({ folder, folderIndex, onChange, onRemove }: FolderFormProps) => {
  const folderLabel = folderIndex === undefined ? 'Folder' : `Folder ${folderIndex + 1}`

  const handleTaskChange = (updatedTask: CreateJourneyTaskDraft) => {
    onChange({
      ...folder,
      tasks: folder.tasks.map((task) => (task.clientId === updatedTask.clientId ? updatedTask : task))
    })
  }

  const handleRemoveTask = (taskClientId: string) => {
    onChange({ ...folder, tasks: folder.tasks.filter((task) => task.clientId !== taskClientId) })
  }

  return (
    <section className="rounded-lg border border-border-subtle bg-surface-subtle/60 p-4">
      <div className="flex items-center gap-3">
        <Icon className="text-primary-foreground" icon="FolderOutlined" />
        <h4 className="min-w-0 flex-1 text-sm font-semibold text-text-strong">{folderLabel}</h4>
        {onRemove && (
          <button
            aria-label={`Remove ${folderLabel}`}
            className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-danger-surface hover:text-danger-foreground focus:outline-none focus:ring-4 focus:ring-focus/20"
            onClick={onRemove}
            type="button"
          >
            <Icon icon="CloseOutlined" />
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4">
        <Input
          className="h-10"
          id={`folder-name-${folder.clientId}`}
          label="Folder name"
          maxLength={255}
          onChange={(event) => onChange({ ...folder, name: event.target.value })}
          placeholder="e.g. HTML and CSS"
          value={folder.name}
        />
        <label
          className="grid gap-2 text-sm font-medium text-text-strong"
          htmlFor={`folder-description-${folder.clientId}`}
        >
          Folder description
          <textarea
            className="min-h-20 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-strong outline-none transition-colors placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10"
            id={`folder-description-${folder.clientId}`}
            onChange={(event) => onChange({ ...folder, description: event.target.value })}
            placeholder="Optional Folder description"
            value={folder.description}
          />
        </label>
      </div>

      <div className="mt-5 space-y-3 border-t border-border-subtle pt-4">
        <div className="flex items-center justify-between gap-4">
          <h5 className="text-sm font-semibold text-text-strong">Tasks</h5>
          <button
            className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-soft focus:outline-none focus:ring-4 focus:ring-focus/20"
            onClick={() => onChange({ ...folder, tasks: [...folder.tasks, createEmptyTask()] })}
            type="button"
          >
            <Icon icon="PlusOutlined" />
            Add Task
          </button>
        </div>
        {folder.tasks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border-strong px-3 py-4 text-center text-xs text-text-muted">
            No Tasks added to this Folder yet.
          </p>
        ) : (
          folder.tasks.map((task, taskIndex) => (
            <TaskForm
              key={task.clientId}
              label={`Task ${taskIndex + 1}`}
              onChange={handleTaskChange}
              onRemove={() => handleRemoveTask(task.clientId)}
              removeLabel={`Remove Task ${taskIndex + 1} from ${folderLabel}`}
              task={task}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default FolderForm
