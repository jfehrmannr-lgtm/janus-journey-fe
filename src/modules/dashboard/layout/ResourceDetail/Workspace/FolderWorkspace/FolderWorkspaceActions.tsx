import Link from 'next/link'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'

interface FolderWorkspaceActionsProps {
  canSaveChanges: boolean
  isSubmitting: boolean
  onSaveChanges: () => void
  returnHref: string
}

/**
 * Renders the Folder workspace header actions.
 *
 * @param canSaveChanges - Whether the current Folder forms can be submitted.
 * @param isSubmitting - Whether a Folder submission is in progress.
 * @param onSaveChanges - Callback invoked by the Save Changes button.
 * @param returnHref - Destination used by the return navigation.
 * @returns The Folder workspace header.
 */
const FolderWorkspaceActions = ({
  canSaveChanges,
  isSubmitting,
  onSaveChanges,
  returnHref
}: FolderWorkspaceActionsProps) => {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Folder workspace</p>
        <h2 className="truncate text-sm font-semibold text-text-primary">Create Folder</h2>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Button
          buttonSize="normal"
          className="rounded-lg bg-primary text-xs font-semibold text-white disabled:opacity-50"
          color="primary"
          disabled={!canSaveChanges || isSubmitting}
          label="Save Changes"
          onClick={onSaveChanges}
          size="nm"
          title={canSaveChanges ? 'Save the current Folder forms' : 'Complete all Folder forms before saving'}
          type="button"
          variant="filled"
        />
        <Link href={returnHref} scroll={false}>
          <Button
            buttonSize="normal"
            color="neutral"
            icon={<Icon icon="CompassOutlined" />}
            label="Return"
            type="button"
            variant="outlined"
          />
        </Link>
      </div>
    </header>
  )
}

export default FolderWorkspaceActions
