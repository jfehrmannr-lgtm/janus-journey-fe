'use client'

import { useState } from 'react'

import ProgressBar from '@/components/ProgressBar/ProgressBar'
import type {
  ProgressBarColor,
  ProgressBarPercentPosition,
  ProgressBarSize
} from '@/components/ProgressBar/ProgressBar.types'

const progressBarSizes: ProgressBarSize[] = ['sm', 'md', 'nm', 'lg', 'xl']
const percentPositions: ProgressBarPercentPosition[] = ['none', 'left', 'right', 'inside']
const progressBarColors: ProgressBarColor[] = ['primary', 'neutral', 'success', 'warning', 'danger']
const progressValues = [0, 25, 50, 75, 100]

/**
 * Presents the supported ProgressBar sizes, positions, colors, and values.
 *
 * @returns The isolated ProgressBar playground.
 */
const ProgressBarPlayground = () => {
  const [interactiveProgress, setInteractiveProgress] = useState(50)

  return (
    <div className="space-y-10">
      <p className="max-w-3xl text-text-body">
        Review responsive progress bars with semantic colors, percentage placement, normalization, and interactive
        values.
      </p>

      <section className="space-y-4" aria-labelledby="progress-bar-sizes-title">
        <h3 className="text-2xl font-semibold" id="progress-bar-sizes-title">
          Sizes
        </h3>
        <div className="space-y-4 rounded-xl border border-border bg-surface-page p-5">
          {progressBarSizes.map((size) => (
            <div className="space-y-2" key={size}>
              <p className="text-sm font-medium text-text-muted">size=&quot;{size}&quot;</p>
              <ProgressBar progress={60} size={size} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="progress-bar-positions-title">
        <h3 className="text-2xl font-semibold" id="progress-bar-positions-title">
          Percentage positions
        </h3>
        <div className="space-y-5 rounded-xl border border-border bg-surface-page p-5">
          {percentPositions.map((position) => (
            <div className="space-y-2" key={position}>
              <p className="text-sm font-medium text-text-muted">showPercent=&quot;{position}&quot;</p>
              <ProgressBar progress={50} showPercent={position} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="progress-bar-colors-title">
        <h3 className="text-2xl font-semibold" id="progress-bar-colors-title">
          Theme colors
        </h3>
        <div className="space-y-4 rounded-xl border border-border bg-surface-page p-5">
          {progressBarColors.map((color) => (
            <div className="space-y-2" key={color}>
              <p className="text-sm font-medium capitalize text-text-muted">color=&quot;{color}&quot;</p>
              <ProgressBar color={color} progress={65} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="progress-bar-values-title">
        <h3 className="text-2xl font-semibold" id="progress-bar-values-title">
          Progress values
        </h3>
        <div className="space-y-4 rounded-xl border border-border bg-surface-page p-5">
          {progressValues.map((value) => (
            <div className="space-y-2" key={value}>
              <p className="text-sm font-medium text-text-muted">{value}%</p>
              <ProgressBar progress={value} showPercent="inside" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="progress-bar-normalization-title">
        <h3 className="text-2xl font-semibold" id="progress-bar-normalization-title">
          Out-of-range normalization
        </h3>
        <div className="space-y-4 rounded-xl border border-border bg-surface-page p-5">
          <ProgressBar progress={-25} />
          <ProgressBar progress={125} color="success" />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="progress-bar-interactive-title">
        <h3 className="text-2xl font-semibold" id="progress-bar-interactive-title">
          Interactive progress
        </h3>
        <div className="space-y-5 rounded-xl border border-border bg-surface-page p-5">
          <ProgressBar color="success" progress={interactiveProgress} showPercent="inside" size="lg" />
          <label className="block space-y-2 text-sm font-medium text-text-body" htmlFor="interactive-progress">
            <span>Progress: {interactiveProgress}%</span>
            <input
              className="w-full accent-primary"
              id="interactive-progress"
              max={100}
              min={0}
              onChange={(event) => setInteractiveProgress(Number(event.target.value))}
              type="range"
              value={interactiveProgress}
            />
          </label>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="progress-bar-responsive-title">
        <h3 className="text-2xl font-semibold" id="progress-bar-responsive-title">
          Responsive containers
        </h3>
        <div className="space-y-5 rounded-xl border border-border bg-surface-page p-5">
          <div className="w-40 space-y-2">
            <p className="text-sm font-medium text-text-muted">Narrow container</p>
            <ProgressBar progress={75} />
          </div>
          <div className="w-full max-w-3xl space-y-2">
            <p className="text-sm font-medium text-text-muted">Wide container</p>
            <ProgressBar progress={75} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgressBarPlayground
