'use client'

import { useRouter } from 'next/navigation'

import CreateResourceButton from '@/components/Button/CreateResourceButton'
import type { ApiTask } from '@/types/resource-api.type'

import TaskItem from './TaskItem'
import Icon from '@/components/Icon/Icon'

interface RootTasksProps {
  createTaskHref?: string
  isSelectingResources?: boolean
  journeyUid: string
  onToggleSelection?: (resourceId: string) => void
  selectedResource?: string[]
  tasks: ApiTask[]
}

/**
 * Renders tasks owned directly by a Journey in the workspace card style.
 *
 * @param createTaskHref - Destination for the root-task creation route.
 * @param isSelectingResources - Whether resource selection mode is active.
 * @param journeyUid - Journey identifier used by the contextual action.
 * @param onToggleSelection - Callback used to select or deselect a task.
 * @param selectedResource - Explicitly selected resource IDs.
 * @param tasks - Root-level Journey tasks.
 * @returns A presentational root task collection.
 */
const RootTasks = ({
  createTaskHref,
  isSelectingResources = false,
  journeyUid,
  onToggleSelection = () => undefined,
  selectedResource = [],
  tasks
}: RootTasksProps) => {
  const router = useRouter()

  return (
    <div className="overflow-hidden rounded-sm border-b border-l border-border-strong/50 hover:border-primary-soft">
      <div className="flex px-3 py-3 space-x-3">
        <Icon className="text-blue-700" icon="CheckSquareOutlined" />
        <div className=" text-sm font-semibold text-text-strong">Task without Folder</div>
      </div>
      <div className="px-9">
        {!isSelectingResources && (
          <div className="border-t border-border-subtle py-2">
            <CreateResourceButton
              onClick={createTaskHref ? () => router.push(createTaskHref, { scroll: false }) : undefined}
              parentResourceType="journey"
              parentUid={journeyUid}
              resourceType="task"
            />
          </div>
        )}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              isSelectingResources={isSelectingResources}
              isSelected={selectedResource.includes(task.uid)}
              key={task.uid}
              onToggleSelection={() => onToggleSelection(task.uid)}
              task={task}
            />
          ))
        ) : (
          <p className="border-t border-border-subtle px-3 py-4 text-sm text-text-muted">No root tasks yet.</p>
        )}
      </div>
    </div>
  )
}

export default RootTasks
