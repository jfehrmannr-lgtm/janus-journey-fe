import Link from 'next/link'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'

interface TaskWorkspaceActionsProps {
  canSaveChanges: boolean
  isSubmitting: boolean
  onSaveChanges: () => void
  returnHref: string
}

/**
 * Renders the root Task workspace header actions.
 *
 * @param canSaveChanges - Whether the current Task forms can be submitted.
 * @param isSubmitting - Whether a Task submission is in progress.
 * @param onSaveChanges - Callback invoked by the Save Changes button.
 * @param returnHref - Destination used by the return navigation.
 * @returns The Task workspace header.
 */
const TaskWorkspaceActions = ({
  canSaveChanges,
  isSubmitting,
  onSaveChanges,
  returnHref
}: TaskWorkspaceActionsProps) => (
  <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Task workspace</p>
      <h2 className="truncate text-sm font-semibold text-text-primary">Create Task</h2>
    </div>
    <div className="flex shrink-0 items-center gap-3">
      <Button
        buttonSize="normal"
        className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
        color="primary"
        disabled={!canSaveChanges || isSubmitting}
        label="Save Changes"
        onClick={onSaveChanges}
        size="nm"
        title={canSaveChanges ? 'Save the current Task forms' : 'Complete all Task forms before saving'}
        type="button"
        variant="filled"
      />
      <Link href={returnHref} scroll={false}>
        <Button
          buttonSize="normal"
          color="neutral"
          icon={<Icon icon="AppstoreOutlined" />}
          label="Return"
          type="button"
          variant="outlined"
        />
      </Link>
    </div>
  </header>
)

export default TaskWorkspaceActions
