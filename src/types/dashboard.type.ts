export type DashboardMetricKey = 'active-journeys' | 'tasks-completed' | 'tasks-in-progress' | 'tasks-remaining'
export type DashboardMetricTone = 'blue' | 'green' | 'indigo' | 'amber'
export type DashboardQuickAction = 'journey' | 'task' | 'explore' | 'shared'

export interface DashboardMetric {
  key: DashboardMetricKey
  value: number
  label: string
  tone: DashboardMetricTone
}

export interface QuickAction {
  key: DashboardQuickAction
  title: string
  description: string
}

export interface DashboardHomeData {
  metrics: DashboardMetric[]
  quickActions: QuickAction[]
}
