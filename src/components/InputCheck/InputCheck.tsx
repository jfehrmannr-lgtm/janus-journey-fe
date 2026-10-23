'use client'

import { useEffect, useId, useRef, type ComponentProps, type ReactNode } from 'react'

export type InputCheckColor = 'primary' | 'danger'

export interface InputCheckProps extends Omit<ComponentProps<'input'>, 'className' | 'color' | 'size' | 'type'> {
  className?: string
  children?: ReactNode
  color?: InputCheckColor
  description?: ReactNode
  error?: ReactNode
  fullWidth?: boolean
  indeterminate?: boolean
  label?: ReactNode
  labelPlacement?: 'start' | 'end'
  size?: 'sm' | 'md' | 'lg'
  type?: 'checkbox' | 'radio'
  variant?: 'default' | 'card'
}

const sizeClasses = {
  lg: {
    content: 'text-base',
    gap: 'gap-3',
    indicator: 'size-6',
    mark: 'text-sm'
  },
  md: {
    content: 'text-sm',
    gap: 'gap-2.5',
    indicator: 'size-5',
    mark: 'text-xs'
  },
  sm: {
    content: 'text-xs',
    gap: 'gap-2',
    indicator: 'size-4',
    mark: 'text-xs'
  }
} as const

const colorClasses = {
  danger: {
    card: 'hover:border-danger-foreground/50 hover:bg-danger-surface has-[:checked]:border-danger-foreground has-[:checked]:bg-danger-surface',
    indicator: 'peer-checked:border-danger-foreground peer-checked:bg-danger-foreground'
  },
  primary: {
    card: 'hover:border-primary/50 hover:bg-surface-subtle has-[:checked]:border-primary has-[:checked]:bg-primary-soft',
    indicator: 'peer-checked:border-primary peer-checked:bg-primary'
  }
} as const

/**
 * Renders a styled native checkbox or radio input with default and card variants.
 *
 * @param ariaDescribedBy - Existing description element identifiers.
 * @param ariaInvalid - Existing native invalid state.
 * @param children - Optional custom content rendered with the label content.
 * @param className - Additional classes applied to the control container.
 * @param color - Theme color used for the checked control state.
 * @param description - Supporting text associated with the control.
 * @param disabled - Whether the native control is disabled.
 * @param error - Optional validation message and error styling.
 * @param fullWidth - Whether a card variant should use the available width.
 * @param id - Identifier associated with the native control and label.
 * @param indeterminate - Indeterminate state applied to checkboxes only.
 * @param label - Visible text associated with the control.
 * @param labelPlacement - Whether the label content appears before or after the control.
 * @param ref - Ref forwarded to the native input.
 * @param size - Visual size of the control and its text.
 * @param type - Native input type, defaulting to checkbox.
 * @param variant - Visual treatment for the control.
 * @returns A native, accessible checkbox or radio control.
 */
const InputCheck = ({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  children,
  className,
  color = 'primary',
  description,
  disabled,
  error,
  fullWidth = false,
  id,
  indeterminate = false,
  label,
  labelPlacement = 'end',
  ref,
  size = 'md',
  type = 'checkbox',
  variant = 'default',
  ...nativeProps
}: InputCheckProps) => {
  const generatedId = useId()
  const inputId = id ?? `input-check-${generatedId}`
  const descriptionId = description !== undefined ? `${inputId}-description` : undefined
  const errorId = error !== undefined ? `${inputId}-error` : undefined
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ')
  const inputRef = useRef<HTMLInputElement>(null)
  const currentSize = sizeClasses[size]
  const currentColor = colorClasses[color]
  const hasError = error !== undefined && error !== null
  const isCard = variant === 'card'

  useEffect(() => {
    if (type === 'checkbox' && inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate, type])

  const assignInputRef = (element: HTMLInputElement | null) => {
    inputRef.current = element

    if (typeof ref === 'function') {
      ref(element)
      return
    }

    if (ref) {
      ref.current = element
    }
  }

  const labelClasses = [
    'group relative flex items-start transition-colors',
    currentSize.gap,
    labelPlacement === 'start' ? 'flex-row-reverse justify-between' : undefined,
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    isCard
      ? [
          'rounded-xl border bg-surface p-4',
          currentColor.card,
          'focus-within:border-focus focus-within:ring-4 focus-within:ring-focus/20'
        ].join(' ')
      : undefined,
    isCard && hasError ? 'border-danger-border' : undefined,
    fullWidth && isCard ? 'w-full' : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const indicatorClasses = [
    currentColor.indicator,
    'peer-focus-visible:ring-4 peer-focus-visible:ring-focus/20',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
    currentSize.indicator,
    type === 'radio' ? 'rounded-full' : 'rounded-md',
    'flex shrink-0 items-center justify-center border-2 border-border-strong bg-surface transition-colors',
    hasError ? 'border-danger-foreground peer-checked:border-danger-foreground' : undefined
  ]
    .filter(Boolean)
    .join(' ')

  const contentClasses = ['min-w-0 flex-1', currentSize.content].join(' ')

  return (
    <div className={fullWidth && !isCard ? 'w-full' : undefined}>
      <label className={labelClasses} htmlFor={inputId}>
        <input
          {...nativeProps}
          aria-describedby={describedBy || undefined}
          aria-invalid={hasError ? true : ariaInvalid}
          className="peer sr-only"
          disabled={disabled}
          id={inputId}
          ref={assignInputRef}
          type={type}
        />
        <span aria-hidden="true" className={indicatorClasses}>
          {type === 'radio' ? (
            <span className="size-2 rounded-full bg-white opacity-0 transition-opacity peer-checked:opacity-100" />
          ) : (
            <span
              className={`${currentSize.mark} font-bold leading-none text-white transition-opacity ${indeterminate ? 'opacity-100' : 'opacity-0 peer-checked:opacity-100'}`}
            >
              {indeterminate ? '−' : '✓'}
            </span>
          )}
        </span>
        <span className={contentClasses}>
          {label !== undefined && <span className="block font-medium text-text-body">{label}</span>}
          {children}
          {description !== undefined && (
            <span className="mt-1 block text-sm font-normal text-text-muted" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      </label>
      {hasError && (
        <p className="mt-1 text-sm text-danger-foreground" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

export default InputCheck
