import type { ChangeEventHandler, InputHTMLAttributes, ReactNode, Ref } from 'react'

export interface SelectOptionItem {
  icon?: ReactNode
  label: string
  value: string
}

export interface SelectOptionProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'defaultValue' | 'disabled' | 'onChange' | 'placeholder' | 'readOnly' | 'type' | 'value'
> {
  options: SelectOptionItem[]
  value?: string
  defaultValue?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
  disabled?: boolean
  enableUnselected?: boolean
  isClereable?: boolean
  isError?: boolean
  isSearchable?: boolean
  isSercheable?: boolean
  placeholder?: string
  ref?: Ref<HTMLInputElement>
}
