import type { ButtonColor, ButtonVariant, ButtonVisualSize, ButtonWidth } from './Button.types'

export const BUTTON_VARIANTS: ButtonVariant[] = ['filled', 'outlined', 'dotted', 'ghost']
export const BUTTON_COLORS: ButtonColor[] = ['primary', 'neutral', 'success', 'warning', 'danger']
export const BUTTON_WIDTHS: ButtonWidth[] = ['sm', 'md', 'nm', 'lg', 'xl', 'full']
export const BUTTON_VISUAL_SIZES: ButtonVisualSize[] = ['thin', 'normal', 'large', 'biggest']

export const BUTTON_WIDTH_CLASSES: Record<ButtonWidth, string> = {
  sm: 'w-24',
  md: 'w-32',
  nm: 'w-fit',
  lg: 'w-48',
  xl: 'w-64',
  full: 'w-full'
}

export const BUTTON_VISUAL_SIZE_CLASSES: Record<ButtonVisualSize, string> = {
  thin: 'min-h-5 px-2 py-0 text-xs',
  normal: 'min-h-8 px-3 py-1 text-sm',
  large: 'min-h-10 px-4 py-2 text-base',
  biggest: 'min-h-12 px-5 py-3 text-base'
}

export const BUTTON_VARIANT_COLOR_CLASSES: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    neutral: 'bg-action text-white hover:bg-action-hover',
    success: 'bg-task-completed-foreground text-white hover:brightness-95',
    warning: 'bg-task-in-pause-foreground text-white hover:brightness-95',
    danger: 'bg-danger-foreground text-white hover:brightness-95'
  },
  outlined: {
    primary: 'border-primary text-primary hover:bg-primary-soft',
    neutral: 'border-border-strong text-text-body hover:bg-surface-subtle',
    success: 'border-task-completed-foreground text-task-completed-foreground hover:bg-task-completed',
    warning: 'border-task-in-pause-foreground text-task-in-pause-foreground hover:bg-task-in-pause',
    danger: 'border-danger-foreground text-danger-foreground hover:bg-danger-surface'
  },
  dotted: {
    primary: 'border-primary text-primary hover:bg-primary-soft',
    neutral: 'border-border-strong text-text-body hover:bg-surface-subtle',
    success: 'border-task-completed-foreground text-task-completed-foreground hover:bg-task-completed',
    warning: 'border-task-in-pause-foreground text-task-in-pause-foreground hover:bg-task-in-pause',
    danger: 'border-danger-foreground text-danger-foreground hover:bg-danger-surface'
  },
  ghost: {
    primary: 'text-primary hover:bg-primary-soft',
    neutral: 'text-text-body hover:bg-surface-subtle',
    success: 'text-task-completed-foreground hover:bg-task-completed',
    warning: 'text-task-in-pause-foreground hover:bg-task-in-pause',
    danger: 'text-danger-foreground hover:bg-danger-surface'
  }
}
