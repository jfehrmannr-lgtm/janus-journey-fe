'use client'

import type { AnimationEvent, CSSProperties, ReactNode, RefObject } from 'react'
import { useEffect, useState } from 'react'

interface DropdownEffectProps {
  children: ReactNode
  containerRef: RefObject<HTMLDivElement | null>
  isOpen: boolean
  style: CSSProperties
}

/**
 * Keeps dropdown content mounted until its exit animation has completed.
 *
 * @param children - Floating content rendered inside the animation boundary.
 * @param containerRef - Reference used by the parent for outside-click detection and positioning.
 * @param isOpen - Whether the dropdown should be visible.
 * @param style - Positioning styles calculated by the parent dropdown.
 * @returns Animated dropdown content while entering or exiting, or null when closed.
 */
const DropdownEffect = ({ children, containerRef, isOpen, style }: DropdownEffectProps) => {
  const [isRendered, setIsRendered] = useState(isOpen)
  const [animationState, setAnimationState] = useState<'entering' | 'exiting'>(isOpen ? 'entering' : 'exiting')

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      if (isOpen) {
        setIsRendered(true)
        setAnimationState('entering')
        return
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsRendered(false)
        return
      }

      setAnimationState('exiting')
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [isOpen])

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || animationState !== 'exiting') {
      return
    }

    setIsRendered(false)
  }

  const shouldRender = isRendered || isOpen

  if (!shouldRender) {
    return null
  }

  const animationClassName =
    (isOpen ? 'entering' : animationState) === 'entering' ? 'dropdown-fade-in' : 'dropdown-fade-out'

  return (
    <div
      aria-hidden={!isOpen}
      className={`${animationClassName} ${isOpen ? '' : 'pointer-events-none'}`}
      onAnimationEnd={handleAnimationEnd}
      ref={containerRef}
      style={style}
    >
      {children}
    </div>
  )
}

export default DropdownEffect
