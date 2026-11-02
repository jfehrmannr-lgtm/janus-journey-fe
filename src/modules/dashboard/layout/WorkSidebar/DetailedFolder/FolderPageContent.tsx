'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import ResourceNotFound from '@/components/WorkSidebar/ResourceNotFound'
import CreateResourceButton from '@/components/Button/CreateResourceButton'
import FolderItem from '@/modules/dashboard/layout/Workspace/FolderItem'
import TaskItem from '@/modules/dashboard/layout/Workspace/TaskItem'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import type { ApiFolderWithTasks } from '@/types/resource-api.type'

interface FolderPageContentProps {
  folderId: string
}

/**
 * Renders a Folder's direct Tasks and any nested Folders in the shared workspace content area.
 *
 * @param folderId - Selected Folder identifier used to read the hydrated resource tree.
 * @returns The Folder detail content or a missing-resource state.
 */
const FolderPageContent = ({ folderId }: FolderPageContentProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const folderQueryKey = navigationQueryKeys.resourceTree('folder', folderId)
  const { data: folder } = useQuery<ApiFolderWithTasks>({
    enabled: false,
    queryFn: () => {
      const cachedFolder = queryClient.getQueryData<ApiFolderWithTasks>(folderQueryKey)

      if (!cachedFolder) {
        throw new Error('The Folder resource is not available in the query cache.')
      }

      return cachedFolder
    },
    queryKey: folderQueryKey
  })

  if (!folder) {
    return <ResourceNotFound resourceType="folder" />
  }

  const nestedFolders = folder.folders ?? []

  return (
    <section className="px-2 py-4" aria-label="Folder resources">
      {nestedFolders.length > 0 && (
        <div className="space-y-3 p-3">
          <h2 className="text-sm font-semibold text-text-strong">Folders</h2>
          {nestedFolders.map((nestedFolder) => (
            <FolderItem
              createTaskHref={`/dashboard/home/folder/${encodeURIComponent(nestedFolder.uid)}/create-task`}
              folder={nestedFolder}
              key={nestedFolder.uid}
            />
          ))}
        </div>
      )}
      <div className="space-y-3 p-3">
        <div className="overflow-hidden rounded-sm border-b border-l border-border-strong/50 hover:border-primary-soft">
          <div className="flex items-center justify-between px-3 py-3">
            <h2 className="text-sm font-semibold text-text-strong">Tasks</h2>
          </div>
          <div className="px-9">
            <div className="border-t border-border-subtle py-2">
              <CreateResourceButton
                onClick={() =>
                  router.push(`/dashboard/home/folder/${encodeURIComponent(folder.uid)}/create-task`, { scroll: false })
                }
                parentResourceType="folder"
                parentUid={folder.uid}
                resourceType="task"
              />
            </div>
            {folder.tasks.length > 0 ? (
              folder.tasks.map((task) => <TaskItem key={task.uid} task={task} />)
            ) : (
              <p className="border-t border-border-subtle px-3 py-4 text-sm text-text-muted">
                No tasks in this folder.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FolderPageContent
