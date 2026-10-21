import Link from 'next/link'
import Icon from '@/components/Icon/Icon'

interface JourneyFolderPageCreateTaskProps {
  params: Promise<{
    journeyId: string
    folderId: string
  }>
}

const JourneyFolderPageCreateTask = async ({ params }: JourneyFolderPageCreateTaskProps) => {
  const { journeyId, folderId } = await params

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border px-5 py-4 text-sm">
        <span className="font-medium text-text-body">Create Task - Journey - {folderId}</span>
        <span className="font-semibold text-text-body">Save Changes</span>
      </div>
      <section className="px-5 py-5">
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="flex items-center gap-3 bg-surface-subtle px-4 py-4">
            <Icon className="text-text-strong" icon="FolderOutlined" />
            <span className="flex-1 font-semibold text-text-strong">{folderId}</span>
            <span className="text-xs text-text-muted">0 / 1</span>
            <Icon className="text-text-muted" icon="DownOutlined" />
          </div>
          <div className="border-t border-border-subtle px-4 py-5 text-sm text-text-body">
            Create a task in this folder.
          </div>
          <div className="flex items-center gap-3 border-t border-border-subtle px-4 py-3 text-base text-text-body">
            <Icon className="text-text-muted" icon="ClockCircleOutlined" />
            <span className="flex-1">New task</span>
            <Icon className="text-text-subtle" icon="EllipsisOutlined" />
          </div>
        </div>
        <Link
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          href={`/dashboard/home/journey/${journeyId}`}
          scroll={false}
        >
          Back to Journey
        </Link>
      </section>
    </div>
  )
}

export default JourneyFolderPageCreateTask
