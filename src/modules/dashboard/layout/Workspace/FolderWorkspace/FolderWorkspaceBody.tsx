import Button from '@/components/Button/Button'
import CreateFolderForm from '@/modules/dashboard/layout/Form/Folder/CreateFolderForm'
import Icon from '@/components/Icon/Icon'
import FolderItem from '@/modules/dashboard/layout/Workspace/FolderItem'
import type { FolderFormErrors, FolderFormValues } from '@/stores/workspaceFromStore'
import type { ApiFolder, ApiFolderWithTasks } from '@/types/resource-api.type'

interface FolderWorkspaceBodyProps {
  activeFormId: string | null
  canAddFolder: boolean
  createFolderForm: FolderFormValues[]
  folders: ApiFolder[]
  formErrors: Record<string, FolderFormErrors>
  formValidity: Record<string, boolean>
  isFolderFormOpen: boolean
  onAddFolder: () => void
  onCancelFolder: (formId: string) => void
  onFormChange: (formId: string, values: Omit<FolderFormValues, 'id'>) => void
  onRemoveFolder: (formId: string) => void
  onSelectFolder: (formId: string) => void
  reference?: {
    name: string
    type: 'journey' | 'folder' | 'user'
  }
}

/**
 * Renders pending and persisted Folder content for the workspace.
 *
 * @param activeFormId - Identifier of the pending Folder currently being edited.
 * @param canAddFolder - Whether another pending Folder may be added.
 * @param createFolderForm - Pending Folder forms from the container.
 * @param folders - Persisted sibling Folders.
 * @param formErrors - Validation errors keyed by pending Folder ID.
 * @param formValidity - Validation state keyed by pending Folder ID.
 * @param isFolderFormOpen - Whether the active pending Folder form is expanded.
 * @param onAddFolder - Callback invoked to add a pending Folder.
 * @param onCancelFolder - Callback invoked to collapse the active form.
 * @param onFormChange - Callback invoked when a pending form changes.
 * @param onRemoveFolder - Callback invoked to remove a pending Folder.
 * @param onSelectFolder - Callback invoked to select a pending Folder.
 * @param reference - Optional parent resource displayed in the Folder form.
 * @returns The Folder workspace content.
 */
const FolderWorkspaceBody = ({
  activeFormId,
  canAddFolder,
  createFolderForm,
  folders,
  formErrors,
  formValidity,
  isFolderFormOpen,
  onAddFolder,
  onCancelFolder,
  onFormChange,
  onRemoveFolder,
  onSelectFolder,
  reference
}: FolderWorkspaceBodyProps) => {
  return (
    <section className="px-5 py-5">
      <div className="overflow-hidden rounded-xl border border-border-subtle">
        <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Folders</div>
        <div className="border-t border-border-subtle px-3 py-2">
          <Button
            buttonSize="normal"
            className="text-text-muted hover:border-primary/50 hover:text-primary"
            color="neutral"
            disabled={!canAddFolder}
            icon={<Icon icon="PlusOutlined" />}
            label="Add Folder"
            size="full"
            type="button"
            onClick={onAddFolder}
            variant="dotted"
          />
        </div>
        {createFolderForm.map((form) => (
          <div className="mx-3 mt-3" key={form.id}>
            <div className="w-full cursor-pointer">
              <FolderItem
                isInvalid={Boolean(formErrors[form.id] && Object.keys(formErrors[form.id]).length > 0)}
                isValid={formValidity[form.id] === true}
                onRemove={() => onRemoveFolder(form.id)}
                onSelect={() => onSelectFolder(form.id)}
                pendingFolder={form}
              />
            </div>
            {activeFormId === form.id && isFolderFormOpen && (
              <div className="border-t border-border-subtle" onClick={(event) => event.stopPropagation()}>
                <CreateFolderForm
                  idPrefix={`workspace-folder-${form.id}`}
                  initialValues={{ description: form.description, name: form.name }}
                  onCancel={() => onCancelFolder(form.id)}
                  onFormChange={(values) => onFormChange(form.id, values)}
                  reference={reference}
                />
              </div>
            )}
          </div>
        ))}
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
    </section>
  )
}

export default FolderWorkspaceBody
