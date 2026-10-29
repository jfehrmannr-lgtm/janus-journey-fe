import type { ButtonHTMLAttributes, ReactElement } from 'react'

export type ButtonVariant = 'filled' | 'outlined' | 'dotted' | 'ghost'
export type ButtonColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger'
export type ButtonWidth = 'sm' | 'md' | 'nm' | 'lg' | 'xl' | 'full'
export type ButtonVisualSize = 'thin' | 'normal' | 'large' | 'biggest'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color' | 'size'> {
  variant?: ButtonVariant
  icon?: ReactElement
  label?: string
  iconSide?: 'left' | 'right'
  count?: number
  color?: ButtonColor
  size?: ButtonWidth
  buttonSize?: ButtonVisualSize
}

export interface ButtonWave {
  id: string
  x: number
  y: number
}
