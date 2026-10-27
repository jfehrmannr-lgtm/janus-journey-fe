import Button from '@/components/Button/Button'
import CreateTaskForm from '@/modules/dashboard/layout/Form/Task/CreateTaskForm'
import Icon from '@/components/Icon/Icon'
import { type TaskFormErrors, type TaskFormValues } from '@/stores/workspaceFromStore'
import type { ApiTask } from '@/types/resource-api.type'

import TaskItem from '../TaskItem'

interface TaskWorkspaceBodyProps {
  activeFormId: string | null
  canAddTask: boolean
  createTaskForm: TaskFormValues[]
  formErrors: Record<string, TaskFormErrors>
  formValidity: Record<string, boolean>
  isTaskFormOpen: boolean
  onAddTask: () => void
  onCancelTask: (formId: string) => void
  onFormChange: (formId: string, values: Omit<TaskFormValues, 'id'>) => void
  onRemoveTask: (formId: string) => void
  onSelectTask: (formId: string) => void
  tasks: ApiTask[]
}

/**
 * Renders pending and persisted root Tasks for the workspace.
 *
 * @param activeFormId - Identifier of the pending Task currently being edited.
 * @param canAddTask - Whether another pending Task may be added.
 * @param createTaskForm - Pending Task forms from the container.
 * @param formErrors - Validation errors keyed by pending Task ID.
 * @param formValidity - Validation state keyed by pending Task ID.
 * @param isTaskFormOpen - Whether the active pending Task form is expanded.
 * @param onAddTask - Callback invoked to add a pending Task.
 * @param onCancelTask - Callback invoked to collapse the active form.
 * @param onFormChange - Callback invoked when a pending form changes.
 * @param onRemoveTask - Callback invoked to remove a pending Task.
 * @param onSelectTask - Callback invoked to select a pending Task.
 * @param tasks - Persisted sibling Tasks.
 * @returns The Task workspace content.
 */
const TaskWorkspaceBody = ({
  activeFormId,
  canAddTask,
  createTaskForm,
  formErrors,
  formValidity,
  isTaskFormOpen,
  onAddTask,
  onCancelTask,
  onFormChange,
  onRemoveTask,
  onSelectTask,
  tasks
}: TaskWorkspaceBodyProps) => (
  <section className="px-5 py-5">
    <div className="overflow-hidden rounded-xl border border-border-subtle">
      <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Tasks</div>
      <div className="border-t border-border-subtle px-3 py-2">
        <Button
          buttonSize="normal"
          className="text-text-muted hover:border-primary/50 hover:text-primary"
          color="neutral"
          disabled={!canAddTask}
          icon={<Icon icon="PlusOutlined" />}
          label="Add Task"
          onClick={onAddTask}
          size="full"
          type="button"
          variant="dotted"
        />
      </div>
      {createTaskForm.map((form) => (
        <div key={form.id}>
          <TaskItem
            isInvalid={Boolean(formErrors[form.id] && Object.keys(formErrors[form.id]).length > 0)}
            isValid={formValidity[form.id] === true}
            onRemove={() => onRemoveTask(form.id)}
            onSelect={() => onSelectTask(form.id)}
            pendingTask={form}
          />
          {activeFormId === form.id && isTaskFormOpen && (
            <div className="border-t border-border-subtle" onClick={(event) => event.stopPropagation()}>
              <CreateTaskForm
                idPrefix={`workspace-task-${form.id}`}
                initialValues={{
                  description: form.description,
                  isVisible: form.isVisible,
                  name: form.name,
                  state: form.state
                }}
                onCancel={() => onCancelTask(form.id)}
                onFormChange={(values) => onFormChange(form.id, values)}
              />
            </div>
          )}
        </div>
      ))}
      {tasks.map((task) => (
        <TaskItem key={task.uid} task={task} />
      ))}
    </div>
  </section>
)

export default TaskWorkspaceBody
