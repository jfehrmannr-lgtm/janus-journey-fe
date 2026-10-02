'use client'

import useJourneyTreeQuery from '@/hooks/useJourneyTreeQuery'
import JourneyTree from '@/layout/SideNav/JourneyTree'
import JourneyTreeSkeleton from '@/layout/SideNav/JourneyTreeSkeleton'

interface JourneyTreeQueryProps {
  journeyUid: string
}

/**
 * Loads one expanded Journey tree and selects the corresponding visual state.
 *
 * @param journeyUid - Stable identifier of the expanded Journey.
 * @returns The Journey tree query boundary.
 */
const JourneyTreeQuery = ({ journeyUid }: JourneyTreeQueryProps) => {
  const { data, error, isLoading } = useJourneyTreeQuery(journeyUid)

  if (isLoading) {
    return <JourneyTreeSkeleton />
  }

  if (error || !data) {
    return <p className="px-9 py-2 text-xs text-rose-500">Unable to load this Journey.</p>
  }

  return <JourneyTree data={data} />
}

export default JourneyTreeQuery
