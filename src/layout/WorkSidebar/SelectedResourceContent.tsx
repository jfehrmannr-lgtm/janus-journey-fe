'use client'

import Icon from '@/components/Icon/Icon'
import JourneyTreeQuery from '@/layout/SideNav/JourneyTreeQuery'
import JourneyTree from '@/layout/SideNav/JourneyTree'
import useAppUiStore from '@/stores/appUiStore'

/**
 * Composes the existing selected-resource Tree inside the generic Work Sidebar.
 *
 * @returns The selected resource Tree, or an empty selection state.
 */
const SelectedResourceContent = () => {
  const selectedResourceType = useAppUiStore((state) => state.selectedResourceType)
  const selectedResourceUid = useAppUiStore((state) => state.selectedResourceUid)

  if (!selectedResourceUid || (selectedResourceType !== 'journey' && selectedResourceType !== 'folder')) {
    return (
      <div className="flex h-full min-h-48 items-center justify-center px-6 text-center">
        <p className="max-w-xs text-sm leading-6 text-slate-500">Select a Journey or Folder to view its work here.</p>
      </div>
    )
  }

  return (
    <JourneyTreeQuery resourceId={selectedResourceUid} resourceType={selectedResourceType}>
      {(data) => (
        <>
          <header className="border-b border-slate-100 px-5 py-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-700">
                <Icon icon={data.rootResource.type === 'journey' ? 'AppstoreOutlined' : 'FolderOutlined'} />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-slate-950">{data.rootResource.name}</h2>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {data.rootResource.description || 'No description available.'}
                </p>
              </div>
            </div>
          </header>
          <section aria-labelledby="selected-resource-tasks" className="px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-950" id="selected-resource-tasks">
              Tasks
            </h3>
            <JourneyTree data={data} />
          </section>
        </>
      )}
    </JourneyTreeQuery>
  )
}

export default SelectedResourceContent
