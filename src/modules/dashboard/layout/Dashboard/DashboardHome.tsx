'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { authClient } from '@/services/authClient'
import type { NavigationRootResources } from '@/types/navigation.type'
import type { Resource } from '@/types/resource.type'
import { getResourcePath, getSelectedResourceFromPathname } from '@/modules/dashboard/utils/dashboardRoutes'
import { calculateProgressPercentage } from '@/modules/dashboard/utils/progress'

import DashboardContinue from './DashboardContinue'
import DashboardHead from './DashboardHead'
import type { DashboardResourceFilter, DashboardResourceView } from './Dashboard.types'
import DashboardTable from './DashboardTable'

interface DashboardHomeProps {
  resources: NavigationRootResources
}

/**
 * Sorts resources from newest to oldest using their optional update timestamp.
 *
 * @param first - First resource being compared.
 * @param second - Second resource being compared.
 * @returns Sort order with most recently modified resources first.
 */
const sortByModifiedDate = <T extends { updatedAt?: string }>(first: T, second: T): number => {
  const firstTime = first.updatedAt === undefined ? 0 : Date.parse(first.updatedAt)
  const secondTime = second.updatedAt === undefined ? 0 : Date.parse(second.updatedAt)

  return (Number.isNaN(secondTime) ? 0 : secondTime) - (Number.isNaN(firstTime) ? 0 : firstTime)
}

const getJourneyProgressPercentage = (journey: NavigationRootResources['journeys'][number]) => {
  return journey.progress === undefined ? undefined : Math.round(calculateProgressPercentage(journey.progress))
}

/**
 * Renders the authenticated Dashboard Home coordinator and its three visual sections.
 *
 * @param resources - Root Journeys, Folders, and Tasks available to the User.
 * @returns The responsive Dashboard Home workspace.
 */
const DashboardHome = ({ resources }: DashboardHomeProps) => {
  const { data: session } = authClient.useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [resourceFilter, setResourceFilter] = useState<DashboardResourceFilter>('journey')
  const [resourceView, setResourceView] = useState<DashboardResourceView>('table')
  const selectedResource = getSelectedResourceFromPathname(pathname)
  const username = session?.user.name?.split(' ')[0] ?? 'there'
  const continueJourneys = resources.journeys
    .filter((journey) => {
      const progressPercentage = getJourneyProgressPercentage(journey)
      return progressPercentage === undefined || progressPercentage < 100
    })
    .sort(sortByModifiedDate)
    .slice(0, 3)

  const handleJourneyCreation = () => {
    router.push('/dashboard/home/create-journey')
  }

  const handleResourceSelect = (resource: Resource) => {
    if (resource.type === 'journey' || resource.type === 'folder') {
      router.push(getResourcePath(resource.type, resource.uid))
    }
  }

  const handleJourneySelect = (journeyUid: string) => {
    router.push(getResourcePath('journey', journeyUid))
  }

  return (
    <div className="min-h-screen  bg-surface-page px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl space-y-1 sm:space-y-2">
        <div className="sticky top-0 z-20">
          <DashboardHead onCreateJourney={handleJourneyCreation} username={username} />
        </div>
        <DashboardContinue
          journeys={continueJourneys}
          onSelectJourney={handleJourneySelect}
          selectedResourceType={selectedResource?.resourceType ?? null}
          selectedResourceUid={selectedResource?.resourceId ?? null}
        />
        <DashboardTable
          onFilterChange={setResourceFilter}
          onSelectResource={handleResourceSelect}
          onViewChange={setResourceView}
          resourceFilter={resourceFilter}
          resources={resources}
          resourceView={resourceView}
          selectedResourceType={selectedResource?.resourceType ?? null}
          selectedResourceUid={selectedResource?.resourceId ?? null}
        />
      </div>
    </div>
  )
}

export default DashboardHome
