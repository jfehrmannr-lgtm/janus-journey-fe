import journeysMock from '@/mock/journeys.mock.json'
import type { DashboardHomeData, JourneySummary } from '@/types/dashboard'
import type { MockDashboardData } from '@/types/resources'

const dashboardData = journeysMock as MockDashboardData

/**
 * Returns summary data required by the Dashboard Home view.
 *
 * @returns A promise containing Dashboard Home metrics and summaries.
 */
const getDashboardHomeData = async (): Promise<DashboardHomeData> => {
  const journeySummaries: JourneySummary[] = dashboardData.dashboardHome.journeySummaries
    .map((summary) => {
      const journey = dashboardData.journeys.find((candidateJourney) => candidateJourney.uid === summary.journeyUid)

      if (!journey) {
        throw new Error('A Dashboard Home Journey summary references an unknown Journey.')
      }

      return { journey, ...summary }
    })
    .sort((firstJourney, secondJourney) => firstJourney.journey.orderIndex - secondJourney.journey.orderIndex)

  return {
    metrics: dashboardData.dashboardHome.metrics,
    journeys: journeySummaries,
    quickActions: dashboardData.dashboardHome.quickActions
  }
}

export { getDashboardHomeData }
