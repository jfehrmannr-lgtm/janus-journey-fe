'use client'

import CreateResourceButton from '@/components/Button/CreateResourceButton'

/**
 * Demonstrates contextual Folder and Task creation entry points.
 *
 * @returns The isolated CreateResourceButton playground.
 */
const CreateResourceButtonPlayground = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="max-w-3xl text-text-body">
          Review creation entry points and the parent resource context supplied to each action.
        </p>
        <p className="rounded-lg border border-border bg-surface-page px-4 py-3 text-sm text-text-body">
          Creation buttons are presentational until their forms and mutations are connected.
        </p>
      </div>

      <section className="space-y-4" aria-labelledby="create-resource-journey-title">
        <div>
          <h3 className="text-2xl font-semibold" id="create-resource-journey-title">
            Journey creation context
          </h3>
          <p className="mt-1 text-sm text-text-muted">Create a Folder owned by the selected Journey.</p>
        </div>
        <div className="max-w-md rounded-xl border border-border-subtle bg-surface-page p-4">
          <CreateResourceButton parentResourceType="journey" parentUid="journey-playground" resourceType="folder" />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="create-resource-folder-title">
        <div>
          <h3 className="text-2xl font-semibold" id="create-resource-folder-title">
            Folder creation context
          </h3>
          <p className="mt-1 text-sm text-text-muted">Create a Task owned by the selected Folder.</p>
        </div>
        <div className="max-w-md rounded-xl border border-border-subtle bg-surface-page p-4">
          <CreateResourceButton parentResourceType="folder" parentUid="folder-playground" resourceType="task" />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="create-resource-root-title">
        <div>
          <h3 className="text-2xl font-semibold" id="create-resource-root-title">
            Root Task contexts
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Compare root-level Task actions for Journey and Folder workspaces.
          </p>
        </div>
        <div className="grid max-w-2xl gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-surface-page p-4">
            <p className="mb-3 text-sm font-semibold text-text-body">Journey root Task</p>
            <CreateResourceButton parentResourceType="journey" parentUid="journey-playground" resourceType="task" />
          </div>
          <div className="rounded-xl border border-border-subtle bg-surface-page p-4">
            <p className="mb-3 text-sm font-semibold text-text-body">Folder root Task</p>
            <CreateResourceButton parentResourceType="folder" parentUid="folder-playground" resourceType="task" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateResourceButtonPlayground
