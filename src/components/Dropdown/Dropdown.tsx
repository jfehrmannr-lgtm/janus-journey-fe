'use client'

import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import Portal from '@/components/Portal/Portal'

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
export type DropdownSize = CSSProperties['width']
export type DropdownContent = ReactNode | ((close: () => void) => ReactNode)

interface DropdownProps {
  content: DropdownContent
  maxHeight?: CSSProperties['maxHeight']
  placement?: DropdownPlacement
  trigger: ReactNode
  width?: DropdownSize
}

interface DropdownPosition {
  left: number
  top: number
  width: number
}

const viewportPadding = 8
const placementGap = 8
const closeAnimationDuration = 150

const toPixels = (value: CSSProperties['width'] | CSSProperties['maxHeight'] | undefined, fallback: number) => {
  if (typeof value === 'number') return `${value}px`
  return value ?? `${fallback}px`
}

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Renders a content-agnostic, portal-based floating dropdown.
 *
 * @param content - React content rendered in the floating panel, or a render function receiving the close callback.
 * @param maxHeight - Maximum height applied to the floating panel.
 * @param placement - Preferred placement relative to the trigger.
 * @param trigger - React content used to open and close the dropdown.
 * @param width - Width applied to the floating panel.
 * @returns A trigger and floating dropdown panel.
 */
const Dropdown = ({ content, maxHeight = 320, placement = 'bottom-start', trigger, width = 240 }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [position, setPosition] = useState<DropdownPosition | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    if (!isOpen) return

    setIsOpen(false)
    setIsClosing(true)
  }, [isOpen])

  useEffect(() => {
    if (!isClosing) return

    previousActiveElement.current?.focus()
    closeTimer.current = setTimeout(() => {
      setIsRendered(false)
      setIsClosing(false)
      setPosition(null)
    }, closeAnimationDuration)

    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [isClosing])

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    previousActiveElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setIsClosing(false)
    setPosition(null)
    setIsRendered(true)
    setIsOpen(true)
  }

  const toggle = () => {
    if (isOpen) {
      close()
      return
    }

    open()
  }

  useEffect(() => {
    if (!isRendered) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!triggerRef.current?.contains(target) && !dropdownRef.current?.contains(target)) close()
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [close, isRendered])

  useLayoutEffect(() => {
    if (!isRendered) return

    let animationFrame = 0

    const updatePosition = () => {
      const triggerElement = triggerRef.current
      const dropdownElement = dropdownRef.current

      if (!triggerElement || !dropdownElement) return

      const triggerRect = triggerElement.getBoundingClientRect()
      const dropdownRect = dropdownElement.getBoundingClientRect()
      const opensBelow = placement.startsWith('bottom')
      const alignsEnd = placement.endsWith('end')
      const preferredLeft = alignsEnd ? triggerRect.right - dropdownRect.width : triggerRect.left
      const fitsBelow = triggerRect.bottom + placementGap + dropdownRect.height <= window.innerHeight - viewportPadding
      const fitsAbove = triggerRect.top - placementGap - dropdownRect.height >= viewportPadding
      const shouldOpenBelow = opensBelow ? fitsBelow || !fitsAbove : !fitsAbove && fitsBelow
      const top = shouldOpenBelow
        ? triggerRect.bottom + placementGap
        : triggerRect.top - dropdownRect.height - placementGap
      const maxLeft = Math.max(viewportPadding, window.innerWidth - dropdownRect.width - viewportPadding)

      setPosition({
        left: Math.min(Math.max(viewportPadding, preferredLeft), maxLeft),
        top: Math.min(
          Math.max(viewportPadding, top),
          Math.max(viewportPadding, window.innerHeight - dropdownRect.height - viewportPadding)
        ),
        width: dropdownRect.width
      })

      if (isOpen && !isClosing) {
        animationFrame = window.requestAnimationFrame(() => {
          dropdownElement.querySelector<HTMLElement>(focusableSelector)?.focus()
        })
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isClosing, isOpen, isRendered, maxHeight, placement, width])

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    toggle()
  }

  const contentNode = typeof content === 'function' ? content(close) : content

  return (
    <>
      <div
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex"
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        role="button"
        tabIndex={0}
      >
        {trigger}
      </div>
      {isRendered && (
        <Portal>
          <div
            aria-hidden={!isOpen}
            className={`fixed z-50 overflow-y-auto rounded-xl border border-border bg-surface p-2 shadow-xs ${isClosing ? 'dropdown-fade-out' : 'dropdown-fade-in'} ${position ? 'opacity-100' : 'opacity-0'}`}
            ref={dropdownRef}
            role="region"
            style={{
              left: position?.left ?? 0,
              maxHeight: toPixels(maxHeight, 320),
              top: position?.top ?? 0,
              width: toPixels(width, 240)
            }}
          >
            {contentNode}
          </div>
        </Portal>
      )}
    </>
  )
}

export default Dropdown
