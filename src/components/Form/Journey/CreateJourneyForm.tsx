'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useCreateJourneyForm } from '@/stores/workspaceFromStore'

/**
 * Renders the UI-only Journey creation form for the Create Journey workspace.
 *
 * @returns A non-submitting Journey creation form surface.
 */
const CreateJourneyForm = () => {
  const name = useCreateJourneyForm((state) => state.createJourneyForm.name)
  const description = useCreateJourneyForm((state) => state.createJourneyForm.description)
  const createJourneyForm = useCreateJourneyForm((state) => state.createJourneyForm)
  const setCreateJourneyForm = useCreateJourneyForm((state) => state.setCreateJourneyForm)

  return (
    <form className="space-y-6 px-5 py-5" onSubmit={(event) => event.preventDefault()}>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">New Journey</p>
        <h2 className="text-xl font-semibold tracking-tight text-text-primary">Shape a path worth following</h2>
        <p className="text-sm leading-6 text-text-muted">
          Start with a clear purpose. Folders and Tasks can be added after the Journey exists.
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
          onChange={(event) =>
            setCreateJourneyForm({
              ...createJourneyForm,
              name: event.target.value
            })
          }
          placeholder="e.g. Learn web development"
          required
          value={name}
        />
        <Input
          id="create-journey-description"
          helperText="Optional. Describe the outcome or purpose of this Journey."
          label="Description"
          name="description"
          onChange={(event) =>
            setCreateJourneyForm({
              ...createJourneyForm,
              description: event.target.value
            })
          }
          placeholder="What do you want to accomplish?"
          type="text-area"
          value={description}
        />
      </section>

      <footer className="border-t border-border pt-5">
        <Button disabled label="Create Journey" size="full" type="submit" />
        <p className="mt-2 text-center text-xs text-text-muted">Creation will be enabled in a future iteration.</p>
      </footer>
    </form>
  )
}

export default CreateJourneyForm
