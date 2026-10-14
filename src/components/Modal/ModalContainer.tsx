'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import Modal from '@/components/Modal/Modal'
import ModalEffect from '@/components/Modal/ModalEffect'
import Portal from '@/components/Portal/Portal'
import useModalUiStore from '@/stores/modalUiStore'

interface ModalContainerProps {
  children: ReactNode
  onModalClose?: () => void
  onModalOpen?: () => void
  title?: string
}

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Coordinates modal UI state, lifecycle transitions, focus, and dismissal behavior.
 *
 * @param children - Content rendered inside the modal presentation.
 * @param onModalClose - Callback invoked once after an open-to-closed state transition.
 * @param onModalOpen - Callback invoked once after a closed-to-open state transition.
 * @param title - Optional modal heading.
 * @returns The mounted modal infrastructure.
 */
const ModalContainer = ({ children, onModalClose, onModalOpen, title }: ModalContainerProps) => {
  const showModal = useModalUiStore((state) => state.showModal)
  const typeModal = useModalUiStore((state) => state.typeModal)
  const setShowModal = useModalUiStore((state) => state.setShowModal)
  const setTypeModal = useModalUiStore((state) => state.setTypeModal)
  const previousShowModal = useRef(showModal)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (previousShowModal.current === showModal) {
      return
    }

    previousShowModal.current = showModal

    if (showModal) {
      onModalOpen?.()
      return
    }

    onModalClose?.()
  }, [onModalClose, onModalOpen, showModal])

  useEffect(() => {
    if (!showModal) {
      return
    }

    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let focusFollowUpFrame = 0
    const focusFrame = window.requestAnimationFrame(() => {
      focusFollowUpFrame = window.requestAnimationFrame(() => {
        dialogRef.current?.focus()
      })
    })

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setShowModal(false)
        setTypeModal(null)
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector))

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.cancelAnimationFrame(focusFollowUpFrame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
      previousActiveElement?.focus()
    }
  }, [setShowModal, setTypeModal, showModal])

  const handleClose = () => {
    setShowModal(false)
    setTypeModal(null)
  }

  return (
    <Portal>
      <ModalEffect isOpen={showModal}>
        <Modal dialogRef={dialogRef} modalType={typeModal} onClose={handleClose} title={title}>
          {children}
        </Modal>
      </ModalEffect>
    </Portal>
  )
}

export default ModalContainer
