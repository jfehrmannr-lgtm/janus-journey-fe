import CreateResourceButton from '@/components/CreateResourceButton/CreateResourceButton'
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
 * @param createTaskHref - Reserved destination for a future root-task route.
 * @param journeyUid - Journey identifier used by the contextual action.
 * @param tasks - Root-level Journey tasks.
 * @returns A presentational root task collection.
 */
const RootTasks = ({ createTaskHref, journeyUid, tasks }: RootTasksProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle">
      <div className="bg-surface-subtle px-3 py-3 text-sm font-semibold text-text-strong">Tasks</div>
      <div className="border-t border-border-subtle px-3 py-2">
        {createTaskHref ? (
          <a
            className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-dotted border-border-subtle px-3 text-sm font-semibold text-text-muted transition-colors hover:border-primary/50 hover:text-primary"
            href={createTaskHref}
          >
            Create Task
          </a>
        ) : (
          <CreateResourceButton parentResourceType="journey" parentUid={journeyUid} resourceType="task" />
        )}
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
