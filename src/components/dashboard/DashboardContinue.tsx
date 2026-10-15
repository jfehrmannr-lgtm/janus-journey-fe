'use client'

import Icon from '@/components/Icon/Icon'
import JourneyCard from '@/components/JourneyCard/JourneyCard'
import type { Journey, ResourceType } from '@/types/resource.type'

interface DashboardContinueProps {
  journeys: Journey[]
  selectedResourceType: ResourceType | null
  selectedResourceUid: string | null
  onSelectJourney: (journeyUid: string) => void
}

/**
 * Renders the most recently modified incomplete Journeys.
 *
 * @param journeys - Incomplete Journeys selected by the Dashboard coordinator.
 * @param selectedResourceType - Currently selected resource type.
 * @param selectedResourceUid - Currently selected resource identifier.
 * @param onSelectJourney - Callback that selects a Journey in the WorkSidebar.
 * @returns The responsive Continue with section.
 */
const DashboardContinue = ({
  journeys,
  selectedResourceType,
  selectedResourceUid,
  onSelectJourney
}: DashboardContinueProps) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 sm:p-6" aria-labelledby="continue-with-title">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary" id="continue-with-title">
            Continue with
          </h2>
          <p className="mt-1 text-sm text-text-body sm:text-base">Pick up where you left off</p>
        </div>
        <span className="mt-3 flex items-center gap-2 text-sm text-text-muted sm:mt-1">
          <Icon icon="ClockCircleOutlined" />
          Last modified
        </span>
      </div>
      {journeys.length > 0 ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {journeys.map((journey) => (
            <JourneyCard
              journey={journey}
              key={journey.uid}
              lastModified={journey.updatedAt}
              onClick={() => onSelectJourney(journey.uid)}
              progress={journey.progress}
              selected={selectedResourceType === 'journey' && selectedResourceUid === journey.uid}
            />
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed border-border-strong px-4 py-8 text-center text-sm text-text-muted">
          All Journeys are complete. Create a new Journey to continue making progress.
        </p>
      )}
    </section>
  )
}

export default DashboardContinue
