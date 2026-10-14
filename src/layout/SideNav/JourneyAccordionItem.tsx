'use client'

import Icon from '@/components/Icon/Icon'
import useAppUiStore from '@/stores/appUiStore'
import type { Journey } from '@/types/resources'

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
  const expandedJourneyUid = useAppUiStore((state) => state.expandedJourneyUid)
  const selectedJourneyUid = useAppUiStore((state) => state.selectedJourneyUid)
  const selectJourney = useAppUiStore((state) => state.selectJourney)
  const isExpanded = expandedJourneyUid === journey.uid
  const selectedResourceType = useAppUiStore((state) => state.selectedResourceType)
  const isSelected = selectedJourneyUid === journey.uid && selectedResourceType === 'journey'

  return (
    <div>
      <button
        aria-expanded={isExpanded}
        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${isSelected ? 'bg-primary-soft font-semibold text-primary-foreground' : 'text-text-body hover:bg-surface-subtle hover:text-text-primary'}`}
        onClick={() => selectJourney(journey.uid)}
        type="button"
      >
        <span className="flex size-4 items-center justify-center text-xs text-text-subtle">
          {isExpanded ? <Icon icon="DownOutlined" /> : <Icon icon="RightOutlined" />}
        </span>
        <span className="truncate">{journey.name}</span>
      </button>
    </div>
  )
}

export default JourneyAccordionItem
