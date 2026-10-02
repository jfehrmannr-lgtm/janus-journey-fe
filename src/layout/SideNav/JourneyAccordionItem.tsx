'use client'

import { DownOutlined, RightOutlined } from '@ant-design/icons'

import useAppUiStore from '@/stores/appUiStore'
import type { Journey } from '@/types/resources'
import JourneyTreeQuery from '@/layout/SideNav/JourneyTreeQuery'

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
  const isSelected = selectedJourneyUid === journey.uid

  return (
    <div>
      <button
        aria-expanded={isExpanded}
        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${isSelected ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
        onClick={() => selectJourney(journey.uid)}
        type="button"
      >
        <span className="flex size-4 items-center justify-center text-xs text-slate-400">
          {isExpanded ? <DownOutlined /> : <RightOutlined />}
        </span>
        <span className="truncate">{journey.name}</span>
      </button>
      {isExpanded && <JourneyTreeQuery journeyUid={journey.uid} />}
    </div>
  )
}

export default JourneyAccordionItem
