export type DashboardMetricTone = 'blue' | 'green' | 'indigo' | 'amber'
export type DashboardQuickAction = 'journey' | 'task' | 'explore' | 'shared'

export interface DashboardMetric {
  key: string
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
