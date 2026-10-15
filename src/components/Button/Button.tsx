'use client'

import { useState } from 'react'
import type { MouseEvent } from 'react'

import { BUTTON_VARIANT_COLOR_CLASSES, BUTTON_VISUAL_SIZE_CLASSES, BUTTON_WIDTH_CLASSES } from './constants'
import type { ButtonProps, ButtonWave } from './Button.types'

/**
 * Renders a reusable semantic button with independent width and visual-size controls.
 *
 * @param variant - Border and background treatment for the button.
 * @param icon - Already-instantiated icon rendered beside the label.
 * @param label - Optional button text. Omit it for an icon-only button with an accessible name.
 * @param iconSide - Side on which the icon is rendered when a label is present.
 * @param count - Optional numeric chip rendered after the label and icon.
 * @param color - Semantic Janus Journey color treatment.
 * @param size - Width of the button, independent from its visual padding.
 * @param buttonSize - Padding, minimum height, and text-size treatment.
 * @returns A semantic HTML button.
 */
const Button = ({
  variant = 'filled',
  icon,
  label,
  iconSide = 'left',
  count,
  color = 'primary',
  size = 'nm',
  buttonSize = 'normal',
  className,
  type = 'button',
  onClick,
  disabled,
  ...nativeProps
}: ButtonProps) => {
  const [waves, setWaves] = useState<ButtonWave[]>([])
  const classes = [
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 font-semibold transition-colors duration-150',
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-focus/20',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variant === 'dotted' ? 'border-dotted' : variant === 'outlined' ? 'border-solid' : 'border-transparent',
    BUTTON_WIDTH_CLASSES[size],
    BUTTON_VISUAL_SIZE_CLASSES[buttonSize],
    BUTTON_VARIANT_COLOR_CLASSES[variant][color],
    className
  ]
    .filter(Boolean)
    .join(' ')

  const iconElement = iconSide === 'left' ? icon : undefined
  const trailingIconElement = iconSide === 'right' ? icon : undefined

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const bounds = event.currentTarget.getBoundingClientRect()
      const x = event.clientX === 0 ? bounds.width / 2 : event.clientX - bounds.left
      const y = event.clientY === 0 ? bounds.height / 2 : event.clientY - bounds.top
      const id = `${Date.now()}-${Math.random()}`

      setWaves((currentWaves) => [...currentWaves, { id, x, y }])
    }

    onClick?.(event)
  }

  const handleWaveEnd = (id: string) => {
    setWaves((currentWaves) => currentWaves.filter((wave) => wave.id !== id))
  }

  return (
    <button {...nativeProps} className={classes} disabled={disabled} onClick={handleClick} type={type}>
      {waves.map((wave) => (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute z-0 size-4 rounded-full bg-current/20 animate-button-wave"
          key={wave.id}
          onAnimationEnd={() => handleWaveEnd(wave.id)}
          style={{ left: wave.x, top: wave.y }}
        />
      ))}
      <div className="relative z-10 inline-flex items-center justify-center gap-2">
        {iconElement}
        {label !== undefined && <span>{label}</span>}
        {trailingIconElement}
        {count !== undefined && (
          <span className="rounded-full bg-current/10 px-1.5 py-0.5 text-xs leading-none">{count}</span>
        )}
      </div>
    </button>
  )
}

export default Button
