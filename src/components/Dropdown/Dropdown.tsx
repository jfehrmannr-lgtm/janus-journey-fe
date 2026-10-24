'use client'

import type { CSSProperties, KeyboardEvent, MouseEvent, ReactElement } from 'react'
import { cloneElement, isValidElement, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

import Portal from '@/components/Portal/Portal'
import useAppUiStore from '@/stores/appUiStore'

import DropdownEffect from './DropdownEffect'
import type { DropdownProps } from './dropdown.types'

const dropdownSpacing = 8
const viewportPadding = 8
const defaultWidth = 240
const defaultMaxHeight = 360

interface DropdownPosition {
  height: number
  left: number
  top: number
  width: number
}

interface DropdownPositioningInput {
  menuHeight: number
  placement: NonNullable<DropdownProps['placement']>
  triggerRect: DOMRect
  viewportHeight: number
  viewportWidth: number
  width: number
}

/**
 * Calculates fixed viewport coordinates for a dropdown while preserving its preferred placement when possible.
 *
 * @param menuHeight - Measured menu height after applying the configured maximum height.
 * @param placement - Preferred vertical direction and horizontal alignment.
 * @param triggerRect - Trigger bounds in viewport coordinates.
 * @param viewportHeight - Current viewport height.
 * @param viewportWidth - Current viewport width.
 * @param width - Requested menu width in pixels.
 * @returns Clamped coordinates and available menu height.
 */
const getDropdownPosition = ({
  menuHeight,
  placement,
  triggerRect,
  viewportHeight,
  viewportWidth,
  width
}: DropdownPositioningInput): DropdownPosition => {
  const menuWidth = Math.min(Math.max(1, width), Math.max(1, viewportWidth - viewportPadding * 2))
  const spaceAbove = Math.max(0, triggerRect.top - dropdownSpacing - viewportPadding)
  const spaceBelow = Math.max(0, viewportHeight - triggerRect.bottom - dropdownSpacing - viewportPadding)
  const prefersAbove = placement.startsWith('top')
  const preferredSpace = prefersAbove ? spaceAbove : spaceBelow
  const oppositeSpace = prefersAbove ? spaceBelow : spaceAbove
  const opensAbove =
    preferredSpace >= menuHeight ? prefersAbove : oppositeSpace >= menuHeight ? !prefersAbove : spaceAbove > spaceBelow
  const availableHeight = Math.max(1, opensAbove ? spaceAbove : spaceBelow)
  const renderedHeight = Math.min(menuHeight, availableHeight)
  const preferredTop = opensAbove
    ? triggerRect.top - renderedHeight - dropdownSpacing
    : triggerRect.bottom + dropdownSpacing
  const maxTop = Math.max(viewportPadding, viewportHeight - renderedHeight - viewportPadding)
  const preferredLeft = placement.endsWith('end') ? triggerRect.right - menuWidth : triggerRect.left
  const maxLeft = Math.max(viewportPadding, viewportWidth - menuWidth - viewportPadding)

  return {
    height: availableHeight,
    left: Math.min(Math.max(viewportPadding, preferredLeft), maxLeft),
    top: Math.min(Math.max(viewportPadding, preferredTop), maxTop),
    width: menuWidth
  }
}

/**
 * Renders reusable, portal-based floating content controlled by shared UI state.
 *
 * @param id - Stable identifier used to coordinate this dropdown through Zustand.
 * @param trigger - Content that toggles the dropdown when activated.
 * @param children - Floating content rendered through the shared Portal component.
 * @param onClose - Optional callback invoked once when an open dropdown closes.
 * @param placement - Preferred placement relative to the trigger.
 * @param width - Floating width in pixels, or the trigger width when set to `trigger`.
 * @param maxHeight - Maximum floating content height in pixels.
 * @returns The dropdown trigger and its portal content.
 */
const Dropdown = ({
  id,
  trigger,
  children,
  onClose,
  placement = 'bottom-start',
  width = defaultWidth,
  maxHeight = defaultMaxHeight
}: DropdownProps) => {
  const activeDropdownId = useAppUiStore((state) => state.activeDropdownId)
  const openDropdown = useAppUiStore((state) => state.openDropdown)
  const closeDropdown = useAppUiStore((state) => state.closeDropdown)
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const dropdownId = useId()
  const isOpen = activeDropdownId === id
  const [position, setPosition] = useState<DropdownPosition>({ height: 0, left: 0, top: 0, width: defaultWidth })
  const [isPositioned, setIsPositioned] = useState(false)
  const previousIsOpen = useRef(false)

  useEffect(() => {
    if (previousIsOpen.current && !isOpen) {
      onClose?.()
    }

    previousIsOpen.current = isOpen
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node

      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        closeDropdown()
      }
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      closeDropdown()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeDropdown, isOpen])

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    const menuElement = menuRef.current

    if (!menuElement) {
      return
    }

    const updatePosition = () => {
      const triggerElement =
        triggerRef.current?.querySelector<HTMLElement>('[data-dropdown-trigger]') ??
        triggerRef.current?.firstElementChild ??
        triggerRef.current

      if (!triggerElement || !menuElement) {
        return
      }

      const triggerRect = triggerElement.getBoundingClientRect()
      const requestedWidth = width === 'trigger' ? triggerRect.width : width
      const nextPosition = getDropdownPosition({
        menuHeight: Math.min(maxHeight, menuElement.scrollHeight),
        placement,
        triggerRect,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        width: requestedWidth
      })

      setPosition((currentPosition) => {
        if (
          currentPosition.height === nextPosition.height &&
          currentPosition.left === nextPosition.left &&
          currentPosition.top === nextPosition.top &&
          currentPosition.width === nextPosition.width
        ) {
          return currentPosition
        }

        return nextPosition
      })
      setIsPositioned(true)
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updatePosition)
    resizeObserver?.observe(menuElement)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      resizeObserver?.disconnect()
    }
  }, [isOpen, maxHeight, placement, width])

  const handleToggle = () => {
    if (isOpen) {
      closeDropdown()
      return
    }

    setIsPositioned(false)
    openDropdown(id)
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  const triggerProps = {
    'aria-controls': dropdownId,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu' as const,
    'data-dropdown-trigger': true,
    onClick: (event: MouseEvent<HTMLElement>) => {
      const originalOnClick = (trigger as ReactElement<{ onClick?: (clickEvent: MouseEvent<HTMLElement>) => void }>)
        .props.onClick
      originalOnClick?.(event)
      handleToggle()
    }
  }

  const renderedTrigger = isValidElement(trigger) ? cloneElement(trigger, triggerProps) : trigger

  const fallbackTriggerProps = isValidElement(trigger)
    ? undefined
    : {
        'aria-controls': dropdownId,
        'aria-expanded': isOpen,
        'aria-haspopup': 'menu' as const,
        'data-dropdown-trigger': true,
        onClick: handleToggle,
        onKeyDown: handleTriggerKeyDown,
        role: 'button' as const,
        tabIndex: 0
      }

  const menuStyle: CSSProperties = {
    left: position.left,
    maxHeight: position.height > 0 ? Math.min(maxHeight, position.height) : maxHeight,
    overflowY: 'auto',
    position: 'fixed',
    top: position.top,
    visibility: isPositioned ? 'visible' : 'hidden',
    width: position.width,
    zIndex: 60
  }

  return (
    <>
      <span className="inline-flex" ref={triggerRef} {...fallbackTriggerProps}>
        {renderedTrigger}
      </span>
      <Portal>
        <DropdownEffect containerRef={menuRef} isOpen={isOpen} style={menuStyle}>
          <div
            aria-label="Dropdown menu"
            className="rounded-xl border border-border bg-surface p-1.5 text-text-body shadow-xl z-60"
            id={dropdownId}
            role="menu"
          >
            {children}
          </div>
        </DropdownEffect>
      </Portal>
    </>
  )
}

export type { DropdownPlacement, DropdownProps } from './dropdown.types'
export default Dropdown
