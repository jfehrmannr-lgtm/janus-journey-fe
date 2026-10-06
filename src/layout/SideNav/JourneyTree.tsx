import Icon from '@/components/Icon/Icon'
import type { JourneyTreeData } from '@/types/resources'

interface JourneyTreeProps {
  data: JourneyTreeData
}

/**
 * Renders the resolved Folder and Task descendants of one Journey.
 *
 * @param data - Selected Journey tree resources.
 * @returns The flat Journey tree content for the SideNav.
 */
const JourneyTree = ({ data }: JourneyTreeProps) => {
  const directTasks = data.tasks.filter((task) => task.parentUid === data.journey.uid)

  return (
    <div className="space-y-3 py-2 pl-9 pr-2">
      {data.folders.map((folder) => {
        const folderTasks = data.tasks.filter((task) => task.parentUid === folder.uid)

        return (
          <div key={folder.uid}>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Icon className="text-slate-400" icon="FolderOutlined" />
              <span className="truncate">{folder.name}</span>
            </div>
            <div className="mt-1 space-y-1 pl-5">
              {folderTasks.map((task) => (
                <div className="flex items-center gap-2 text-xs text-slate-500" key={task.uid}>
                  {task.status === 'completed' || task.status === 'discarded' ? (
                    <Icon className="text-emerald-500" icon="CheckCircleOutlined" />
                  ) : (
                    <Icon className="text-slate-300" icon="MinusCircleOutlined" />
                  )}
                  <span className="truncate">{task.name}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
      {directTasks.map((task) => (
        <div className="flex items-center gap-2 text-xs text-slate-500" key={task.uid}>
          {task.status === 'completed' || task.status === 'discarded' ? (
            <Icon className="text-emerald-500" icon="CheckCircleOutlined" />
          ) : (
            <Icon className="text-slate-300" icon="MinusCircleOutlined" />
          )}
          <span className="truncate">{task.name}</span>
        </div>
      ))}
    </div>
  )
}

export default JourneyTree
