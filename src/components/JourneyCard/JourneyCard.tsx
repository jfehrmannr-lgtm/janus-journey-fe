'use client'

import Icon from '@/components/Icon/Icon'
import useAppUiStore from '@/stores/appUiStore'
import type { Journey } from '@/types/resources'

interface JourneyCardProps {
  journey: Journey
}

/**
 * Renders a selectable Journey summary for Dashboard and other Journey lists.
 *
 * Progress is intentionally omitted until it is provided by the Journey API.
 *
 * @param journey - Journey resource represented by the card.
 * @returns A clickable Journey card.
 */
const JourneyCard = ({ journey }: JourneyCardProps) => {
  const selectedJourneyUid = useAppUiStore((state) => state.selectedJourneyUid)
  const selectedResourceType = useAppUiStore((state) => state.selectedResourceType)
  const selectJourney = useAppUiStore((state) => state.selectJourney)
  const isSelected = selectedJourneyUid === journey.uid && selectedResourceType === 'journey'

  return (
    <button
      aria-pressed={isSelected}
      className={`cursor-pointer group flex w-full items-center gap-4 rounded-2xl border bg-white p-5 text-left transition hover:border-blue-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${isSelected ? 'border-blue-400 ring-1 ring-blue-400/30' : 'border-slate-200/80'}`}
      onClick={() => selectJourney(journey.uid)}
      type="button"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
        <Icon icon="AppstoreOutlined" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-lg font-semibold text-slate-950">{journey.name}</span>
        <span className="mt-1 block line-clamp-2 text-sm leading-6 text-slate-500">
          {journey.description || 'No description available.'}
        </span>
      </span>
      <Icon
        className="shrink-0 text-xl text-slate-400 transition-colors group-hover:text-blue-600"
        icon="RightOutlined"
      />
    </button>
  )
}

export default JourneyCard
