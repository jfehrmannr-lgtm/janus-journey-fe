'use client'

import type { ReactNode, RefObject } from 'react'
import { useId } from 'react'

import Icon from '@/components/Icon/Icon'
import type { ModalType } from '@/stores/modalUiStore'

interface ModalProps {
  children: ReactNode
  dialogRef: RefObject<HTMLDivElement | null>
  modalType: ModalType | null
  onClose: () => void
  title?: string
}

/**
 * Renders the accessible, business-agnostic modal presentation.
 *
 * @param children - Content rendered inside the modal body.
 * @param dialogRef - Reference used by the modal container for focus management.
 * @param modalType - Current UI operation type exposed as modal metadata.
 * @param onClose - Callback used by the close control and backdrop.
 * @param title - Optional modal heading.
 * @returns The modal dialog presentation.
 */
const Modal = ({ children, dialogRef, modalType, onClose, title }: ModalProps) => {
  const titleId = useId()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-modal-type={modalType ?? undefined}>
      <button
        aria-label="Close modal"
        className="absolute inset-0 cursor-default bg-surface-inverse/50 backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />
      <div
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        aria-label={title ? undefined : 'Modal dialog'}
        className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          {title ? (
            <h2 className="text-xl font-semibold text-text-primary" id={titleId}>
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            aria-label="Close modal"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-lg text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary focus:outline-none focus:ring-4 focus:ring-focus/20"
            onClick={onClose}
            type="button"
          >
            <Icon icon="CloseOutlined" />
          </button>
        </header>
        <div className="min-h-0 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

export default Modal
