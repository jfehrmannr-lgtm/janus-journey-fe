'use client'

import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useSyncExternalStore } from 'react'

interface PortalProps {
  children: ReactNode
}

/**
 * Renders client content into the document body without accessing the DOM during SSR.
 *
 * @param children - Content rendered through the body portal.
 * @returns The body portal content after client mounting, or null during SSR.
 */
const Portal = ({ children }: PortalProps) => {
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  )

  if (!isMounted) {
    return null
  }

  return createPortal(children, document.body)
}

export default Portal
