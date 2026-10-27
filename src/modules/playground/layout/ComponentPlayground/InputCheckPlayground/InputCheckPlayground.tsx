'use client'

import { useState } from 'react'

import Icon from '@/components/Icon/Icon'
import InputCheck from '@/components/InputCheck/InputCheck'

/**
 * Presents the reusable InputCheck checkbox and radio configurations.
 *
 * @returns The interactive InputCheck playground.
 */
const InputCheckPlayground = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [theme, setTheme] = useState('light')
  const [selectedCards, setSelectedCards] = useState(['tasks'])

  const toggleCard = (value: string) => {
    setSelectedCards((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    )
  }

  return (
    <div className="space-y-10">
      <p className="max-w-3xl text-text-body">
        Test native checkbox and radio behavior with shared sizing, descriptions, validation, and card presentations.
      </p>

      <section className="space-y-4" aria-labelledby="input-check-default-title">
        <h3 className="text-2xl font-semibold" id="input-check-default-title">
          Default controls
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-border bg-surface-page p-5">
            <InputCheck
              checked={isVisible}
              label="Make task visible"
              name="visible-task"
              onChange={(event) => setIsVisible(event.target.checked)}
            />
            <InputCheck defaultChecked label="Enable notifications" name="notifications" />
            <p className="text-sm text-text-muted">Controlled and uncontrolled checkbox examples.</p>
          </div>
          <div className="space-y-4 rounded-xl border border-border bg-surface-page p-5">
            <InputCheck
              description="Required before continuing."
              error="Please confirm this setting."
              label="Confirm account settings"
              name="confirmation"
              required
            />
            <InputCheck disabled label="Unavailable option" name="disabled-option" />
            <p className="text-sm text-text-muted">Required, error, and disabled states.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="input-check-sizes-title">
        <h3 className="text-2xl font-semibold" id="input-check-sizes-title">
          Sizes and label placement
        </h3>
        <div className="grid gap-4 rounded-xl border border-border bg-surface-page p-5 sm:grid-cols-3">
          <InputCheck label="Small" name="small" size="sm" />
          <InputCheck label="Medium" name="medium" size="md" />
          <InputCheck label="Large" name="large" size="lg" />
          <InputCheck label="Label starts" labelPlacement="start" name="label-start" />
          <InputCheck
            description="Description stays below the label."
            label="With description"
            name="with-description"
          />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="input-check-radio-title">
        <h3 className="text-2xl font-semibold" id="input-check-radio-title">
          Radio group
        </h3>
        <div className="grid gap-3 rounded-xl border border-border bg-surface-page p-5 sm:grid-cols-2">
          <InputCheck
            checked={theme === 'light'}
            label="Light"
            name="theme"
            onChange={() => setTheme('light')}
            type="radio"
            value="light"
          />
          <InputCheck
            checked={theme === 'dark'}
            label="Dark"
            name="theme"
            onChange={() => setTheme('dark')}
            type="radio"
            value="dark"
          />
          <p className="text-sm text-text-muted sm:col-span-2">Selected theme: {theme}.</p>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="input-check-card-title">
        <h3 className="text-2xl font-semibold" id="input-check-card-title">
          Card variant
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputCheck
            checked={selectedCards.includes('tasks')}
            description="Organize daily work and reminders."
            fullWidth
            label="Tasks"
            name="resources"
            onChange={() => toggleCard('tasks')}
            type="checkbox"
            variant="card"
          >
            <span className="mt-2 block text-primary-foreground">
              <Icon icon="CheckSquareOutlined" />
            </span>
          </InputCheck>
          <InputCheck
            checked={selectedCards.includes('journeys')}
            description="Plan larger objectives with structure."
            fullWidth
            label="Journeys"
            name="resources"
            onChange={() => toggleCard('journeys')}
            type="checkbox"
            variant="card"
          >
            <span className="mt-2 block text-primary-foreground">
              <Icon icon="AppstoreOutlined" />
            </span>
          </InputCheck>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="input-check-indeterminate-title">
        <h3 className="text-2xl font-semibold" id="input-check-indeterminate-title">
          Indeterminate checkbox
        </h3>
        <div className="rounded-xl border border-border bg-surface-page p-5">
          <InputCheck
            description="The indeterminate property is synchronized through the native input ref."
            indeterminate
            label="Some resources selected"
            name="partial-selection"
          />
        </div>
      </section>
    </div>
  )
}

export default InputCheckPlayground
