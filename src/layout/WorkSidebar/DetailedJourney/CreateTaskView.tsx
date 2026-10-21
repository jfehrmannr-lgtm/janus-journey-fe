'use client'

import Link from 'next/link'
import { useState } from 'react'

import Button from '@/components/Button/Button'
import CreateTaskForm from '@/components/Form/Task/CreateTaskForm'
import Icon from '@/components/Icon/Icon'
import FolderItem from '@/components/Workspace/FolderItem'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import { useQueryClient } from '@tanstack/react-query'
import type { ApiJourneyWithResources } from '@/types/resource-api.type'

interface CreateTaskViewProps {
  folderId: string
  journeyId: string
}

/**
 * Composes the contextual Folder Create Task view from hydrated Journey data.
 *
 * @param folderId - Folder identifier from the current route.
 * @param journeyId - Journey identifier used to locate the hydrated Folder.
 * @returns The action bar, Folder card, local form, and existing tasks.
 */
const CreateTaskView = ({ folderId, journeyId }: CreateTaskViewProps) => {
  const queryClient = useQueryClient()
  const journey = queryClient.getQueryData<ApiJourneyWithResources>(
    navigationQueryKeys.resourceTree('journey', journeyId)
  )
  const folder = journey?.folders.find((currentFolder) => currentFolder.uid === folderId)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  if (!folder) {
    return <ResourceNotFound resourceType="folder" />
  }

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
              embedded
              folderId={folderId}
              idPrefix="embedded-task"
              journeyId={journeyId}
              onCancel={() => setIsTaskFormOpen(false)}
            />
          )}
        </FolderItem>
        <Link
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          href={`/dashboard/home/journey/${encodeURIComponent(journeyId)}`}
          scroll={false}
        >
          Cancel and return to Journey
        </Link>
      </section>
    </div>
  )
}

export default CreateTaskView
