'use client'

import { useRouter } from 'next/navigation'

import CreateResourceButton from '@/components/Button/CreateResourceButton'
import type { ApiTask } from '@/types/resource-api.type'

import TaskItem from './TaskItem'

interface RootTasksProps {
  createTaskHref?: string
  journeyUid: string
  tasks: ApiTask[]
}

/**
 * Renders tasks owned directly by a Journey in the workspace card style.
 *
 * @param createTaskHref - Destination for the root-task creation route.
 * @param journeyUid - Journey identifier used by the contextual action.
 * @param tasks - Root-level Journey tasks.
 * @returns A presentational root task collection.
 */
const RootTasks = ({ createTaskHref, journeyUid, tasks }: RootTasksProps) => {
  const router = useRouter()

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle">
      <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Tasks</div>
      <div className="border-t border-border-subtle px-3 py-2">
        <CreateResourceButton
          onClick={createTaskHref ? () => router.push(createTaskHref, { scroll: false }) : undefined}
          parentResourceType="journey"
          parentUid={journeyUid}
          resourceType="task"
        />
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.uid} task={task} />)
      ) : (
        <p className="border-t border-border-subtle px-3 py-4 text-sm text-text-muted">No root tasks yet.</p>
      )}
    </div>
  )
}

export default RootTasks
