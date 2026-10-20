'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon from '@/components/Icon/Icon'
import type { Journey } from '@/types/resource.type'
import { getResourcePath, getSelectedResourceFromPathname } from '@/utils/dashboardRoutes'

interface JourneyAccordionItemProps {
  journey: Journey
}

/**
 * Renders one selectable and expandable Journey resource in the SideNav.
 *
 * @param journey - Journey resource represented by the accordion item.
 * @returns The Journey accordion item.
 */
const JourneyAccordionItem = ({ journey }: JourneyAccordionItemProps) => {
  const pathname = usePathname()
  const selectedResource = getSelectedResourceFromPathname(pathname)
  const isExpanded = selectedResource?.resourceType === 'journey' && selectedResource.resourceId === journey.uid
  const isSelected = isExpanded

  return (
    <div>
      <Link
        aria-expanded={isExpanded}
        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${isSelected ? 'bg-primary-soft font-semibold text-primary-foreground' : 'text-text-body hover:bg-surface-subtle hover:text-text-primary'}`}
        href={getResourcePath('journey', journey.uid)}
        scroll={false}
      >
        <span className="flex size-4 items-center justify-center text-xs text-text-subtle">
          {isExpanded ? <Icon icon="DownOutlined" /> : <Icon icon="RightOutlined" />}
        </span>
        <span className="truncate">{journey.name}</span>
      </Link>
    </div>
  )
}

export default JourneyAccordionItem
