import journeysMock from '@/mock/journeys.mock.json'
import type { DashboardHomeData } from '@/types/dashboard'
import type { MockDashboardData } from '@/types/resources'

const dashboardData = journeysMock as MockDashboardData

/**
 * Returns summary data required by the Dashboard Home view.
 *
 * @returns A promise containing Dashboard Home metrics and summaries.
 */
const getDashboardHomeData = async (): Promise<DashboardHomeData> => {
  return {
    metrics: dashboardData.dashboardHome.metrics,
    quickActions: dashboardData.dashboardHome.quickActions
  }
}

export { getDashboardHomeData }
