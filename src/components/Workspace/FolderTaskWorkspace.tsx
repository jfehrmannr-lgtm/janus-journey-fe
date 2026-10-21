'use client'

import Link from 'next/link'
import { useState } from 'react'

import Button from '@/components/Button/Button'
import CreateTaskForm from '@/components/Form/Task/CreateTaskForm'
import Icon from '@/components/Icon/Icon'
import FolderItem from '@/components/Workspace/FolderItem'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'

interface FolderTaskWorkspaceProps {
  folder: ApiFolderWithTasks
  returnHref: string
}

/**
 * Renders the task creation workspace for a resolved Folder.
 *
 * @param folder - Resolved Folder and its existing tasks.
 * @param returnHref - Destination used by the cancel navigation.
 * @returns The Folder task workspace presentation and interactions.
 */
const FolderTaskWorkspace = ({ folder, returnHref }: FolderTaskWorkspaceProps) => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  return (
    <div>
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Journey workspace</p>
          <h2 className="truncate text-sm font-semibold text-text-primary">Create Task - {folder.name}</h2>
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
        <FolderItem folder={folder} showCompletionProgress={false} showCreateTaskAction={false}>
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
            <CreateTaskForm
              idPrefix="embedded-task"
              onCancel={() => setIsTaskFormOpen(false)}
              onSubmit={() => setIsTaskFormOpen(false)}
              reference={{ name: folder.name, type: 'folder' }}
            />
          )}
        </FolderItem>
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

export default FolderTaskWorkspace
