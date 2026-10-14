'use client'

import type { AnimationEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface ModalEffectProps {
  children: ReactNode
  isOpen: boolean
}

/**
 * Keeps modal content mounted through its exit animation and removes it afterward.
 *
 * @param children - Modal content animated inside the effect boundary.
 * @param isOpen - Whether the modal should be visible.
 * @returns Animated modal content while entering or exiting, or null when closed.
 */
const ModalEffect = ({ children, isOpen }: ModalEffectProps) => {
  const [isRendered, setIsRendered] = useState(isOpen)
  const [animationState, setAnimationState] = useState<'entering' | 'exiting'>(isOpen ? 'entering' : 'exiting')

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      if (isOpen) {
        setIsRendered(true)
        setAnimationState('entering')
        return
      }

      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (shouldReduceMotion) {
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

  if (!isRendered) {
    return null
  }

  const animationClassName = animationState === 'entering' ? 'modal-fade-in' : 'modal-fade-out'

  return (
    <div
      aria-hidden={!isOpen}
      className={`relative ${animationClassName} ${isOpen ? '' : 'pointer-events-none'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  )
}

export default ModalEffect
