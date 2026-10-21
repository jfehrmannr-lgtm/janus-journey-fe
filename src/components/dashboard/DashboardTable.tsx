'use client'

import type { KeyboardEvent } from 'react'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import type { IconName } from '@/components/Icon/Icon'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import type { NavigationRootResources } from '@/types/navigation.type'
import type { Resource, ResourceType } from '@/types/resource.type'
import { calculateProgressPercentage } from '@/utils/progress'

import type { DashboardResourceFilter, DashboardResourceView } from './Dashboard.types'

interface DashboardTableProps {
  resources: NavigationRootResources
  resourceFilter: DashboardResourceFilter
  resourceView: DashboardResourceView
  selectedResourceType: ResourceType | null
  selectedResourceUid: string | null
  onFilterChange: (filter: DashboardResourceFilter) => void
  onViewChange: (view: DashboardResourceView) => void
  onSelectResource: (resource: Resource) => void
}

const resourceLabels: Record<DashboardResourceFilter, string> = {
  journey: 'Journeys',
  folder: 'Folders',
  task: 'Tasks'
}

const resourceIcons: Record<ResourceType, IconName> = {
  journey: 'AppstoreOutlined',
  folder: 'FolderOutlined',
  task: 'CheckSquareOutlined'
}

/**
 * Returns progress data when a root resource supports progress.
 *
 * @param resource - Root resource being rendered.
 * @returns Progress data for Journeys and Folders, or undefined for Tasks.
 */
const getResourceProgress = (resource: Resource) => {
  if (resource.type === 'journey' || resource.type === 'folder') {
    return resource.progress
  }

  return undefined
}

/**
 * Resolves a whole-number progress percentage for a root resource.
 *
 * @param resource - Root resource being rendered.
 * @returns Progress percentage or undefined when progress is unavailable.
 */
const getResourceProgressPercentage = (resource: Resource) => {
  const progress = getResourceProgress(resource)

  return progress === undefined ? undefined : Math.round(calculateProgressPercentage(progress))
}

/**
 * Returns the display state for a Task resource.
 *
 * @param resource - Root resource being rendered.
 * @returns Human-readable Task state or undefined for other resource types.
 */
const getResourceStatus = (resource: Resource): string | undefined => {
  return resource.type === 'task' ? resource.state.replace('-', ' ') : undefined
}

/**
 * Returns a safe description for a root resource.
 *
 * @param resource - Root resource being rendered.
 * @returns Existing description or a fallback label.
 */
const getResourceDescription = (resource: Resource): string => {
  return resource.description || 'No description available.'
}

/**
 * Selects the root resources represented by the active Dashboard tab.
 *
 * @param resources - Root resources loaded for navigation.
 * @param filter - Active resource type filter.
 * @returns Resources matching the active filter.
 */
const getResourcesByFilter = (resources: NavigationRootResources, filter: DashboardResourceFilter): Resource[] => {
  if (filter === 'journey') {
    return resources.journeys
  }

  if (filter === 'folder') {
    return resources.rootFolders
  }

  return resources.rootTasks
}

/**
 * Renders the root-resource selector, view controls, and resource collection.
 *
 * @param resources - Root Journeys, Folders, and Tasks loaded for navigation.
 * @param resourceFilter - Active resource type tab.
 * @param resourceView - Active table or cards presentation.
 * @param selectedResourceType - Currently selected resource type.
 * @param selectedResourceUid - Currently selected resource identifier.
 * @param onFilterChange - Callback for changing the resource type tab.
 * @param onViewChange - Callback for changing the collection presentation.
 * @param onSelectResource - Callback for selecting a Journey or Folder.
 * @returns The responsive My Journeys resource workspace.
 */
const DashboardTable = ({
  resources,
  resourceFilter,
  resourceView,
  selectedResourceType,
  selectedResourceUid,
  onFilterChange,
  onViewChange,
  onSelectResource
}: DashboardTableProps) => {
  const resourceCounts: Record<DashboardResourceFilter, number> = {
    journey: resources.journeys.length,
    folder: resources.rootFolders.length,
    task: resources.rootTasks.length
  }
  const filteredResources = getResourcesByFilter(resources, resourceFilter)

  const isResourceSelected = (resource: Resource): boolean => {
    return selectedResourceType === resource.type && selectedResourceUid === resource.uid
  }

  const handleResourceKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, resource: Resource) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectResource(resource)
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 sm:p-6" aria-labelledby="my-journeys-title">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary" id="my-journeys-title">
            My Journeys
          </h2>
          <p className="mt-1 text-sm text-text-body sm:text-base">Explore your root-level resources</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div
            className="flex max-w-full overflow-x-auto rounded-xl bg-surface-subtle p-1 space-x-1"
            role="tablist"
            aria-label="Resource type"
          >
            {(['journey', 'folder', 'task'] as DashboardResourceFilter[]).map((filter) => (
              <Button
                aria-selected={resourceFilter === filter}
                buttonSize="normal"
                color={resourceFilter === filter ? 'primary' : 'neutral'}
                count={resourceCounts[filter]}
                key={filter}
                label={resourceLabels[filter]}
                onClick={() => onFilterChange(filter)}
                size="nm"
                type="button"
                variant={resourceFilter === filter ? 'filled' : 'outlined'}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-border p-1 space-x-1" role="group" aria-label="Resource view">
              <Button
                aria-pressed={resourceView === 'table'}
                buttonSize="normal"
                color={resourceView === 'table' ? 'primary' : 'neutral'}
                icon={<Icon icon="UnorderedListOutlined" />}
                label="Table"
                onClick={() => onViewChange('table')}
                size="nm"
                type="button"
                variant={resourceView === 'table' ? 'filled' : 'outlined'}
              />
              <Button
                aria-pressed={resourceView === 'cards'}
                buttonSize="normal"
                color={resourceView === 'cards' ? 'primary' : 'neutral'}
                icon={<Icon icon="AppstoreOutlined" />}
                label="Cards"
                onClick={() => onViewChange('cards')}
                size="nm"
                type="button"
                variant={resourceView === 'cards' ? 'filled' : 'outlined'}
              />
            </div>
            <Button
              buttonSize="normal"
              color="neutral"
              icon={<Icon icon="SettingOutlined" />}
              label="Filters"
              variant="outlined"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 max-h-96 max-w-full overflow-auto rounded-xl border border-border-subtle md:max-h-144">
        {filteredResources.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-text-muted">No {resourceLabels[resourceFilter]} found.</p>
        ) : resourceView === 'table' ? (
          <table className="min-w-max w-full text-left">
            <thead className="sticky top-0 z-10 bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-text-muted">
              <tr>
                <th className="px-4 py-3" scope="col">
                  Name
                </th>
                <th className="px-4 py-3" scope="col">
                  Type
                </th>
                <th className="min-w-56 px-4 py-3" scope="col">
                  Progress
                </th>
                <th className="px-4 py-3" scope="col">
                  Last modified
                </th>
                <th className="px-4 py-3" scope="col">
                  <span className="sr-only">Select</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredResources.map((resource) => {
                const progressPercentage = getResourceProgressPercentage(resource) ?? 0
                const selectable = resource.type !== 'task'
                const rowClasses = `bg-surface transition-colors ${isResourceSelected(resource) ? 'bg-primary-soft/60' : 'hover:bg-surface-subtle'}`
                const rowContent = (
                  <>
                    <td className="max-w-80 px-4 py-3">
                      <div className="flex min-w-56 items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-foreground">
                          <Icon icon={resourceIcons[resource.type]} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-text-primary">
                            {resource.name}
                          </span>
                          <span className="block truncate text-xs text-text-muted">
                            {getResourceDescription(resource)}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-body">{resourceLabels[resource.type]}</td>
                    <td className="px-4 py-3">
                      <div className="flex min-w-56 items-center gap-3">
                        <ProgressBar className="min-w-32" progress={progressPercentage} size="sm" />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-text-muted">
                      {resource.updatedAt ? new Date(resource.updatedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {selectable && <Icon className="text-text-subtle" icon="RightOutlined" />}
                    </td>
                  </>
                )

                return selectable ? (
                  <tr
                    aria-selected={isResourceSelected(resource)}
                    className={rowClasses}
                    key={resource.uid}
                    onClick={() => onSelectResource(resource)}
                    onKeyDown={(event) => handleResourceKeyDown(event, resource)}
                    tabIndex={0}
                  >
                    {rowContent}
                  </tr>
                ) : (
                  <tr className={rowClasses} key={resource.uid}>
                    {rowContent}
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="grid gap-3 p-3 md:grid-cols-2">
            {filteredResources.map((resource) => {
              const progress = getResourceProgress(resource)
              const progressPercentage = getResourceProgressPercentage(resource) ?? 0
              const selectable = resource.type !== 'task'
              const cardClasses = `rounded-xl border p-4 text-left transition-colors cursor-pointer ${isResourceSelected(resource) ? 'border-primary bg-primary-soft/40' : 'border-border-subtle bg-surface hover:border-primary/50'}`
              const cardContent = (
                <>
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-foreground">
                      <Icon icon={resourceIcons[resource.type]} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-text-primary">{resource.name}</span>
                      <span className="mt-1 block line-clamp-2 text-sm text-text-muted">
                        {getResourceDescription(resource)}
                      </span>
                    </span>
                    {selectable && <Icon className="shrink-0 text-text-subtle" icon="RightOutlined" />}
                  </div>
                  <div className="mt-4">
                    <ProgressBar progress={progressPercentage} size="sm" />
                    {progress === undefined && (
                      <span className="mt-2 block text-xs capitalize text-text-muted">
                        {getResourceStatus(resource) ?? 'Progress unavailable; showing 0%'}
                      </span>
                    )}
                  </div>
                </>
              )

              return selectable ? (
                <button
                  className={cardClasses}
                  key={resource.uid}
                  onClick={() => onSelectResource(resource)}
                  type="button"
                >
                  {cardContent}
                </button>
              ) : (
                <article className={cardClasses} key={resource.uid}>
                  {cardContent}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default DashboardTable
