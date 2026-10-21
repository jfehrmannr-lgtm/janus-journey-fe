'use client'

import Link from 'next/link'
import { useState } from 'react'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import type { ApiTask } from '@/types/resource-api.type'

import TaskItem from './TaskItem'

interface TaskWorkspaceProps {
  tasks: ApiTask[]
  returnHref: string
}

/**
 * Renders the shared Task workspace.
 *
 * @param returnHref - Destination used by the cancel navigation.
 * @returns A link back to the parent resource.
 */
const TaskWorkspace = ({ tasks, returnHref }: TaskWorkspaceProps) => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  console.debug('tasks', tasks)

  return (
    <div>
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Task workspace</p>
          <h2 className="truncate text-sm font-semibold text-text-primary">Create Task</h2>
        </div>
        <button
          className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white opacity-50"
          disabled
          title="Task persistence is not implemented yet"
          type="button"
        >
          Save Changes
        </button>
      </header>

      <section className="px-5 py-5">
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Tasks</div>
          <div className="border-t border-border-subtle px-3 py-2">
            <Button
              buttonSize="normal"
              className="text-text-muted hover:border-primary/50 hover:text-primary"
              color="neutral"
              icon={<Icon icon="PlusOutlined" />}
              label="Add Task"
              onClick={() => setIsTaskFormOpen((current) => !current)}
              size="full"
              type="button"
              variant="dotted"
            />
          </div>
          {isTaskFormOpen && (
            <p className="border-t border-border-subtle px-3 py-4 text-sm text-text-muted">
              Task creation is not available without parent resource context.
            </p>
          )}
          {tasks.map((task) => (
            <TaskItem key={task.uid} task={task} />
          ))}
        </div>
        <Link
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          href={returnHref}
          scroll={false}
        >
          Cancel and return to Journey
        </Link>
      </section>
    </div>
  )
}

export default TaskWorkspace
