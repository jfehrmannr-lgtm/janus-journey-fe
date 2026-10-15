import JourneyForm from '@/components/Form/Journey/JourneyForm'
import { createJourneyAction } from './actions'

/**
 * Renders the full-page Create Journey workflow inside the authenticated Dashboard layout.
 *
 * @returns The Create Journey route content.
 */
const CreateJourneyPage = () => {
  return (
    <div className="min-h-screen bg-surface-page px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary">Create Journey</h1>
          <p className="text-sm text-text-muted">Build a new Journey with Folders and Tasks to organize your goals.</p>
        </header>
        <JourneyForm cancelHref="/dashboard/home" onSubmit={createJourneyAction} />
      </div>
    </div>
  )
}

export default CreateJourneyPage
