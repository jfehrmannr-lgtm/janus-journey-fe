'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import Button from '@/components/Button/Button'
import { BUTTON_COLORS, BUTTON_VARIANTS, BUTTON_VISUAL_SIZES, BUTTON_WIDTHS } from '@/components/Button/constants'
import Icon from '@/components/Icon/Icon'

/**
 * Presents the reusable Button configurations for visual inspection.
 *
 * @returns The isolated Button playground.
 */
const ButtonPlayground = () => {
  const [lastAction, setLastAction] = useState('No button has been clicked yet.')

  const handleAction = (action: string) => {
    setLastAction(action)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLastAction('Submit button submitted the form.')
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="max-w-3xl text-text-body">
          Review the reusable Button variants, theme colors, dimensions, icon placement, counts, and native states.
        </p>
        <p className="rounded-lg border border-border bg-surface-page px-4 py-3 text-sm text-text-body" role="status">
          {lastAction}
        </p>
      </div>

      <section className="space-y-4" aria-labelledby="button-variants-title">
        <h3 className="text-2xl font-semibold" id="button-variants-title">
          Variants
        </h3>
        <div className="flex flex-wrap gap-3">
          {BUTTON_VARIANTS.map((variant) => (
            <Button
              key={variant}
              label={`${variant[0].toUpperCase()}${variant.slice(1)}`}
              variant={variant}
              onClick={() => handleAction(`${variant} variant clicked.`)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="button-colors-title">
        <h3 className="text-2xl font-semibold" id="button-colors-title">
          Theme colors
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUTTON_COLORS.map((color) => (
            <div className="space-y-3 rounded-xl border border-border bg-surface-page p-4" key={color}>
              <h4 className="font-semibold capitalize">{color}</h4>
              <div className="flex flex-wrap gap-2">
                {BUTTON_VARIANTS.map((variant) => (
                  <Button
                    buttonSize="thin"
                    color={color}
                    key={`${color}-${variant}`}
                    label={variant}
                    variant={variant}
                    onClick={() => handleAction(`${color} ${variant} clicked.`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="button-widths-title">
        <h3 className="text-2xl font-semibold" id="button-widths-title">
          Widths
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUTTON_WIDTHS.map((width) => (
            <div className="space-y-2" key={width}>
              <p className="text-sm font-medium text-text-muted">size=&quot;{width}&quot;</p>
              <Button label={width === 'full' ? 'Full width' : `${width} width`} size={width} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="button-sizes-title">
        <h3 className="text-2xl font-semibold" id="button-sizes-title">
          Button sizes
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {BUTTON_VISUAL_SIZES.map((buttonSize) => (
            <Button buttonSize={buttonSize} key={buttonSize} label={buttonSize} size="lg" />
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="button-icons-title">
        <h3 className="text-2xl font-semibold" id="button-icons-title">
          Icons
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<Icon icon="PlusOutlined" />} iconSide="left" label="Left icon" />
          <Button icon={<Icon icon="ArrowRightOutlined" />} iconSide="right" label="Right icon" />
          <Button aria-label="Open settings" icon={<Icon icon="SettingOutlined" />} size="sm" />
          <Button label="Without icon" />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="button-counts-title">
        <h3 className="text-2xl font-semibold" id="button-counts-title">
          Counts
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button count={12} icon={<Icon icon="BellOutlined" />} label="Notifications" />
          <Button count={0} label="Empty state" variant="outlined" />
          <Button label="No count" variant="dotted" />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="button-states-title">
        <h3 className="text-2xl font-semibold" id="button-states-title">
          States
        </h3>
        <p className="text-sm text-text-muted">
          Hover and focus the first two buttons to inspect their keyboard and pointer states.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button label="Normal" />
          <Button label="Focus" variant="outlined" />
          <Button disabled label="Disabled" />
          <Button
            className="shadow-lg"
            label="Combined"
            color="success"
            count={3}
            icon={<Icon icon="CheckCircleOutlined" />}
          />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="button-native-title">
        <h3 className="text-2xl font-semibold" id="button-native-title">
          Native behavior
        </h3>
        <form
          className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-page p-5"
          onSubmit={handleSubmit}
        >
          <Button
            label="Button type"
            onClick={() => handleAction('Button type clicked without submitting.')}
            type="button"
          />
          <Button label="Submit type" type="submit" variant="outlined" />
          <span className="text-sm text-text-muted">Both controls are inside a real form.</span>
        </form>
      </section>
    </div>
  )
}

export default ButtonPlayground
