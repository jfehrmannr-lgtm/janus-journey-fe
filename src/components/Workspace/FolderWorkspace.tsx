'use client'

import Link from 'next/link'

import Button from '@/components/Button/Button'
import CreateFolderForm from '@/components/Form/Folder/CreateFolderForm'
import Icon from '@/components/Icon/Icon'
import { useState } from 'react'
import FolderItem from '@/components/Workspace/FolderItem'
import type { ApiFolder, ApiFolderWithTasks } from '@/types/resource-api.type'

interface FolderWorkspaceProps {
  folders: ApiFolder[]
  reference?: {
    name: string
    type: 'journey' | 'folder' | 'user'
  }
  returnHref: string
}

/**
 * Renders the shared Folder workspace.
 *
 * @param folders - Sibling Folders already resolved by the parent container.
 * @param reference - Optional parent resource displayed in the Folder form.
 * @param returnHref - Destination used by the cancel navigation.
 * @returns The Folder workspace presentation and navigation.
 */
const FolderWorkspace = ({ folders, reference, returnHref }: FolderWorkspaceProps) => {
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false)

  return (
    <div>
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Folder workspace</p>
          <h2 className="truncate text-sm font-semibold text-text-primary">Create Folder</h2>
        </div>
        <button
          className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white opacity-50"
          disabled
          title="Folder persistence is not implemented yet"
          type="button"
        >
          Save Changes
        </button>
      </header>

      <section className="px-5 py-5">
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Folders</div>
          <div className="border-t border-border-subtle px-3 py-2">
            <Button
              buttonSize="normal"
              className="text-text-muted hover:border-primary/50 hover:text-primary"
              color="neutral"
              icon={<Icon icon="PlusOutlined" />}
              label="Add Folder"
              size="full"
              type="button"
              variant="dotted"
              onClick={() => setIsFolderFormOpen((current) => !current)}
            />
          </div>
          {isFolderFormOpen && (
            <CreateFolderForm
              embedded
              idPrefix="workspace-folder"
              onCancel={() => setIsFolderFormOpen(false)}
              onSubmit={() => setIsFolderFormOpen(false)}
              reference={reference}
            />
          )}
          <div className="space-y-3 p-3">
            {folders.map((folder) => (
              <FolderItem
                disableCollapse
                folder={folder as ApiFolderWithTasks}
                key={folder.uid}
                showCreateTaskAction={false}
              />
            ))}
          </div>
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

export default FolderWorkspace
