'use client'

import { useId, useState, type ComponentProps, type ReactNode } from 'react'

import Icon from '@/components/Icon/Icon'

export interface InputProps extends ComponentProps<'input'> {
  error?: ReactNode
  helperText?: ReactNode
  icon?: ReactNode
  label?: ReactNode
  sideIcon?: 'left' | 'right'
}

/**
 * Renders a reusable semantic text input with Janus Journey's standard field styling.
 *
 * @param error - Optional validation message displayed below the input.
 * @param helperText - Optional supporting text displayed below the input.
 * @param icon - Optional decorative content displayed inside the input.
 * @param label - Optional accessible label displayed above the input.
 * @param sideIcon - Side on which the icon is rendered.
 * @returns A styled native HTML input with optional field content.
 */
const Input = ({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  disabled,
  error,
  helperText,
  icon,
  id,
  label,
  ref,
  sideIcon = 'right',
  type = 'text',
  ...nativeProps
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const generatedId = useId()
  const inputId = id ?? (label ? generatedId : undefined)
  const helperId = inputId ? `${inputId}-helper` : undefined
  const errorId = inputId ? `${inputId}-error` : undefined
  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type
  const hasLeftIcon = icon !== undefined && sideIcon === 'left'
  const hasRightIcon = icon !== undefined && sideIcon === 'right'
  const hasPasswordToggle = isPassword
  const describedBy = [ariaDescribedBy, helperText !== undefined ? helperId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ')

  const inputClasses = [
    'h-11 w-full rounded-lg border bg-surface px-3 text-sm text-text-strong outline-none transition-colors',
    'placeholder:text-text-subtle focus:border-focus focus:ring-4 focus:ring-focus/10',
    'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-text-muted disabled:opacity-70',
    hasLeftIcon ? 'pl-10' : undefined,
    hasRightIcon || hasPasswordToggle ? 'pr-10' : undefined,
    error ? 'border-danger-foreground focus:border-danger-foreground' : 'border-border',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="space-y-2">
      {label !== undefined && (
        <label className="block text-sm font-semibold text-text-body" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...nativeProps}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : ariaInvalid}
          className={inputClasses}
          disabled={disabled}
          id={inputId}
          ref={ref}
          type={inputType}
        />
        {hasPasswordToggle ? (
          <button
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-body focus:outline-none focus-visible:ring-4 focus-visible:ring-focus/20 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled}
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            <Icon icon={isPasswordVisible ? 'EyeInvisibleOutlined' : 'EyeOutlined'} />
          </button>
        ) : (
          hasRightIcon && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            >
              {icon}
            </span>
          )
        )}
        {hasLeftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          >
            {icon}
          </span>
        )}
      </div>
      {error ? (
        <p className="text-xs text-danger-foreground" id={errorId}>
          {error}
        </p>
      ) : (
        helperText !== undefined && (
          <p className="text-xs text-text-muted" id={helperId}>
            {helperText}
          </p>
        )
      )}
    </div>
  )
}

export default Input
