'use client'

import { useState } from 'react'

import JourneyCard from '@/modules/dashboard/components/JourneyCard/JourneyCard'
import type { Journey, ResourceProgress } from '@/types/resource.type'

interface JourneyCardExample {
  journey: Journey
  progress?: ResourceProgress
  lastModified?: string
}

const createJourney = (uid: string, name: string, description: string): Journey => ({
  uid,
  type: 'journey',
  parentUid: 'component-playground-user',
  name,
  description
})

const noProgressJourney = createJourney(
  'journey-no-progress',
  'Journey without progress',
  'The existing normalized Journey model does not include progress data, so the card can hide it when unavailable.'
)

const journeyExamples: JourneyCardExample[] = [
  {
    journey: createJourney('journey-zero', 'Start a new Journey', 'A Journey with no completed tasks yet.'),
    progress: { completed: 0, discarded: 0, total: 8, percentage: 0 },
    lastModified: '2026-10-15T08:00:00.000Z'
  },
  {
    journey: createJourney(
      'journey-half',
      'Learn web development',
      'Build practical skills through a structured path.'
    ),
    progress: { completed: 4, discarded: 0, total: 8, percentage: 50 },
    lastModified: '2026-10-13T08:00:00.000Z'
  },
  {
    journey: createJourney(
      'journey-complete',
      'Ship the finished project',
      'Everything needed for the project is complete.'
    ),
    progress: { completed: 8, discarded: 0, total: 8, percentage: 100 },
    lastModified: '2026-10-08T08:00:00.000Z'
  }
]

const longNameJourney = createJourney(
  'journey-long-name',
  'Plan and complete a long-term personal growth and professional development Journey',
  'A description with a long Journey name demonstrates truncation without breaking the card layout.'
)

const longDescriptionJourney = createJourney(
  'journey-long-description',
  'Improve communication',
  'Practice writing, presenting, listening, feedback, collaboration, and thoughtful communication habits across personal and professional situations.'
)

/**
 * Demonstrates JourneyCard states, optional data, and responsive layouts.
 *
 * @returns The isolated JourneyCard playground.
 */
const JourneyCardPlayground = () => {
  const [selectedJourneyUid, setSelectedJourneyUid] = useState('journey-half')
  const [lastSelectedJourney, setLastSelectedJourney] = useState('Learn web development')

  const handleSelectJourney = (journey: Journey) => {
    setSelectedJourneyUid(journey.uid)
    setLastSelectedJourney(journey.name)
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="max-w-3xl text-text-body">
          Review Journey summaries with progress, selection, optional metadata, and responsive card layouts.
        </p>
        <p className="rounded-lg border border-border bg-surface-page px-4 py-3 text-sm text-text-body" role="status">
          Selected Journey: {lastSelectedJourney}
        </p>
      </div>

      <section className="space-y-4" aria-labelledby="journey-card-progress-title">
        <h3 className="text-2xl font-semibold" id="journey-card-progress-title">
          Progress states
        </h3>
        <div className="grid gap-4 lg:grid-cols-3">
          {journeyExamples.map((example) => (
            <JourneyCard
              journey={example.journey}
              key={example.journey.uid}
              lastModified={example.lastModified}
              progress={example.progress}
              selected={selectedJourneyUid === example.journey.uid}
              onClick={() => handleSelectJourney(example.journey)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="journey-card-selection-title">
        <h3 className="text-2xl font-semibold" id="journey-card-selection-title">
          Selected and unselected
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <JourneyCard
            journey={journeyExamples[1].journey}
            lastModified={journeyExamples[1].lastModified}
            progress={journeyExamples[1].progress}
            selected
          />
          <JourneyCard
            journey={journeyExamples[0].journey}
            lastModified={journeyExamples[0].lastModified}
            progress={journeyExamples[0].progress}
          />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="journey-card-types-title">
        <h3 className="text-2xl font-semibold" id="journey-card-types-title">
          Resource icons
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <JourneyCard journey={journeyExamples[1].journey} type="journey" />
          <JourneyCard journey={journeyExamples[1].journey} type="folder" />
          <JourneyCard journey={journeyExamples[1].journey} type="task" />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="journey-card-content-title">
        <h3 className="text-2xl font-semibold" id="journey-card-content-title">
          Content and optional data
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <JourneyCard
            journey={longNameJourney}
            lastModified="2026-10-14T08:00:00.000Z"
            progress={journeyExamples[1].progress}
          />
          <JourneyCard
            journey={longDescriptionJourney}
            lastModified="2026-10-12T08:00:00.000Z"
            progress={journeyExamples[1].progress}
          />
          <JourneyCard journey={noProgressJourney} showProgress={false} />
          <JourneyCard
            journey={journeyExamples[2].journey}
            progress={journeyExamples[2].progress}
            showLastModified={false}
          />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="journey-card-row-title">
        <h3 className="text-2xl font-semibold" id="journey-card-row-title">
          Responsive three-card layout
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {journeyExamples.map((example) => (
            <JourneyCard
              journey={example.journey}
              key={`row-${example.journey.uid}`}
              lastModified={example.lastModified}
              progress={example.progress}
              onClick={() => handleSelectJourney(example.journey)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default JourneyCardPlayground
