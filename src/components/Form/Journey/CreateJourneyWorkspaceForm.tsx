'use client'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import Input from '@/components/Input/Input'
import { useCreateJourneyForm } from '@/stores/workspaceFromStore'

/**
 * Renders the UI-only Journey creation form for the Create Journey workspace.
 *
 * @returns A non-submitting Journey creation form surface.
 */
const CreateJourneyWorkspaceForm = () => {
  const name = useCreateJourneyForm((state) => state.createJourneyForm.name)
  const description = useCreateJourneyForm((state) => state.createJourneyForm.description)
  const setJourneyName = useCreateJourneyForm((state) => state.setJourneyName)
  const setJourneyDescription = useCreateJourneyForm((state) => state.setJourneyDescription)

  return (
    <form className="space-y-6 px-5 py-5" onSubmit={(event) => event.preventDefault()}>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">New Journey</p>
        <h2 className="text-xl font-semibold tracking-tight text-text-primary">Shape a path worth following</h2>
        <p className="text-sm leading-6 text-text-muted">
          Start with a clear purpose. You can organize Folders and Tasks around it as the Journey takes form.
        </p>
      </div>

      <section
        className="space-y-4 rounded-xl border border-border bg-surface p-4"
        aria-labelledby="journey-details-title"
      >
        <div>
          <h3 className="font-semibold text-text-primary" id="journey-details-title">
            Journey details
          </h3>
          <p className="mt-1 text-sm text-text-muted">Give this Journey a name and a short description.</p>
        </div>
        <Input
          id="create-journey-name"
          label="Journey name"
          name="name"
          onChange={(event) => setJourneyName(event.target.value)}
          placeholder="e.g. Learn web development"
          required
          value={name}
        />
        <Input
          id="create-journey-description"
          helperText="Optional. Describe the outcome or purpose of this Journey."
          label="Description"
          name="description"
          onChange={(event) => setJourneyDescription(event.target.value)}
          placeholder="What do you want to accomplish?"
          type="text-area"
          value={description}
        />
      </section>

      <section className="space-y-3" aria-labelledby="journey-structure-title">
        <div>
          <h3 className="font-semibold text-text-primary" id="journey-structure-title">
            Journey structure
          </h3>
          <p className="mt-1 text-sm text-text-muted">Folders and Tasks can be added once the Journey is created.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-dashed border-border-strong bg-surface-subtle p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-primary">
                <Icon icon="FolderOutlined" />
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">Folders</p>
                <p className="text-xs text-text-muted">Group related Tasks.</p>
              </div>
            </div>
            <Button
              className="mt-4"
              disabled
              icon={<Icon icon="PlusOutlined" />}
              label="Add Folder"
              size="full"
              type="button"
              variant="outlined"
            />
          </div>
          <div className="rounded-xl border border-dashed border-border-strong bg-surface-subtle p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-primary">
                <Icon icon="CheckSquareOutlined" />
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">Tasks</p>
                <p className="text-xs text-text-muted">Define the work to complete.</p>
              </div>
            </div>
            <Button
              className="mt-4"
              disabled
              icon={<Icon icon="PlusOutlined" />}
              label="Add Task"
              size="full"
              type="button"
              variant="outlined"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-border pt-5">
        <Button disabled label="Create Journey" size="full" type="submit" />
        <p className="mt-2 text-center text-xs text-text-muted">Creation will be enabled in a future iteration.</p>
      </footer>
    </form>
  )
}

export default CreateJourneyWorkspaceForm
