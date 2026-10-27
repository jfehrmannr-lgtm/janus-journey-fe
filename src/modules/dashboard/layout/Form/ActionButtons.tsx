'use client'

interface ActionButtonsProps {
  cancelLabel?: string
  isCancelDisabled?: boolean
  isPrimaryDisabled?: boolean
  onCancel: () => void
  disableSubmitAction?: boolean
  primaryLabel: string
}

/**
 * Renders reusable form cancellation and primary action controls.
 *
 * @param cancelLabel - Text displayed on the cancellation button.
 * @param isCancelDisabled - Whether the cancellation button is disabled.
 * @param isPrimaryDisabled - Whether the primary action button is disabled.
 * @param isSubmitting - Whether the primary action is currently pending.
 * @param onCancel - Callback invoked by the cancellation button.
 * @param primaryLabel - Text displayed on the primary action button.
 * @returns Generic form action buttons.
 */
const ActionButtons = ({
  cancelLabel = 'Cancel',
  isCancelDisabled = false,
  isPrimaryDisabled = false,
  onCancel,
  disableSubmitAction = false,
  primaryLabel
}: ActionButtonsProps) => {
  return (
    <footer className="flex justify-end gap-3 border-t border-border pt-5">
      <button
        className="rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-text-body transition-colors hover:bg-surface-subtle focus:outline-none focus:ring-4 focus:ring-focus/20 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isCancelDisabled || disableSubmitAction}
        onClick={onCancel}
        type="button"
      >
        {cancelLabel}
      </button>
      <button
        className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-focus/20 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPrimaryDisabled || disableSubmitAction}
        type="submit"
      >
        {disableSubmitAction ? 'Saving...' : primaryLabel}
      </button>
    </footer>
  )
}

export default ActionButtons
