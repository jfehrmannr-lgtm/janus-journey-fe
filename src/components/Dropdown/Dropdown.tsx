'use client'

import type { CSSProperties } from 'react'
import { isValidElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import Portal from '@/components/Portal/Portal'

import type { DropdownPosition, DropdownPositioningInput, DropdownProps } from './Dropdown.type'

export type { DropdownContent, DropdownPlacement, DropdownProps, DropdownSize } from './Dropdown.type'

const viewportPadding = 8
const placementGap = 8
const closeAnimationDuration = 150
const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const toPixels = (value: CSSProperties['width'] | CSSProperties['maxHeight'] | undefined, fallback: number) => {
  if (typeof value === 'number') return `${value}px`
  return value ?? `${fallback}px`
}

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum)

const getDropdownPosition = ({
  dropdownHeight,
  dropdownWidth,
  placement,
  triggerRect,
  viewportHeight,
  viewportWidth
}: DropdownPositioningInput): DropdownPosition => {
  const opensBelow = placement.startsWith('bottom')
  const alignsEnd = placement.endsWith('end')
  const fitsBelow = triggerRect.bottom + placementGap + dropdownHeight <= viewportHeight - viewportPadding
  const fitsAbove = triggerRect.top - placementGap - dropdownHeight >= viewportPadding
  const opensDown = opensBelow ? fitsBelow || !fitsAbove : !fitsAbove && fitsBelow
  const preferredTop = opensDown ? triggerRect.bottom + placementGap : triggerRect.top - dropdownHeight - placementGap
  const preferredLeft = alignsEnd ? triggerRect.right - dropdownWidth : triggerRect.left

  return {
    left: clamp(
      preferredLeft,
      viewportPadding,
      Math.max(viewportPadding, viewportWidth - dropdownWidth - viewportPadding)
    ),
    top: clamp(
      preferredTop,
      viewportPadding,
      Math.max(viewportPadding, viewportHeight - dropdownHeight - viewportPadding)
    )
  }
}

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
  const [isClosing, setIsClosing] = useState(false)
  const [position, setPosition] = useState<DropdownPosition | null>(null)
  const triggerContainerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const hasFocusedDropdown = useRef(false)
  const isVisible = isOpen || isClosing

  const close = useCallback(() => {
    if (!isOpen) return
    setIsOpen(false)
    setIsClosing(true)
  }, [isOpen])

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    previousActiveElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    hasFocusedDropdown.current = false
    setIsClosing(false)
    setPosition(null)
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
    if (!isClosing) return

    previousActiveElement.current?.focus()
    closeTimer.current = setTimeout(() => {
      setIsClosing(false)
      setPosition(null)
    }, closeAnimationDuration)

    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [isClosing])

  useEffect(() => {
    if (!isVisible) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!triggerContainerRef.current?.contains(target) && !dropdownRef.current?.contains(target)) close()
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return

      event.preventDefault()
      close()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [close, isVisible])

  useLayoutEffect(() => {
    if (!isVisible) return

    let animationFrame = 0

    const updatePosition = () => {
      const triggerElement = triggerContainerRef.current
      const dropdownElement = dropdownRef.current

      if (!triggerElement || !dropdownElement) return

      setPosition(
        getDropdownPosition({
          dropdownHeight: dropdownElement.getBoundingClientRect().height,
          dropdownWidth: dropdownElement.getBoundingClientRect().width,
          placement,
          triggerRect: triggerElement.getBoundingClientRect(),
          viewportHeight: window.innerHeight,
          viewportWidth: window.innerWidth
        })
      )

      if (isOpen && !hasFocusedDropdown.current) {
        hasFocusedDropdown.current = true
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
  }, [isOpen, isVisible, maxHeight, placement, width])

  const hasInteractiveTrigger = isValidElement(trigger)
  const triggerNode = hasInteractiveTrigger ? (
    trigger
  ) : (
    <button aria-expanded={isOpen} aria-haspopup="true" onClick={toggle} type="button">
      {trigger}
    </button>
  )
  const contentNode = typeof content === 'function' ? content(close) : content

  return (
    <>
      <div
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex"
        onClick={hasInteractiveTrigger ? toggle : undefined}
        ref={triggerContainerRef}
      >
        {triggerNode}
      </div>
      {isVisible && (
        <Portal>
          <div
            aria-hidden={!isOpen}
            className={`fixed z-60 overflow-y-auto rounded-xl border border-border bg-surface p-2 shadow-xs ${isClosing ? 'dropdown-fade-out' : 'dropdown-fade-in'} ${position ? 'opacity-100' : 'opacity-0'}`}
            ref={dropdownRef}
            role="region"
            style={{
              left: position?.left ?? 0,
              top: position?.top ?? 0
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
