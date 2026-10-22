'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent, type ChangeEventHandler } from 'react'

import Icon from '@/components/Icon/Icon'
import Input from '@/components/Input/Input'

import SelectOptionDropdown from './SelectOptionDropdown'
import type { SelectOptionItem, SelectOptionProps } from './selectOption.types'

export type { SelectOptionItem, SelectOptionProps } from './selectOption.types'
const dropdownSafeSpacing = 8
const dropdownMaxHeight = 300

/**
 * Renders a custom single-value dropdown using the shared Input visual treatment.
 *
 * @param options Options displayed in the dropdown.
 * @param value Controlled selected option value.
 * @param defaultValue Initial selected option value for uncontrolled usage.
 * @param onChange Callback notified when an option is selected.
 * @param className Additional classes applied to the input.
 * @param disabled Whether the selector is disabled.
 * @param enableUnselected Whether the dropdown includes a no-selection option.
 * @param isClereable Whether a selected option can be cleared.
 * @param isError Whether to render the selector in its error state.
 * @param isSercheable Whether the open selector filters options as the user types.
 * @param placeholder Placeholder displayed when no option is selected.
 * @param ref Ref forwarded to the underlying input.
 * @returns A read-only input trigger with a custom options list.
 */
const SelectOption = ({
  options,
  value,
  defaultValue = '',
  onChange,
  className = '',
  disabled = false,
  enableUnselected = false,
  isClereable = false,
  isError = false,
  isSercheable = true,
  placeholder,
  ref,
  ...inputProps
}: SelectOptionProps) => {
  const placeholderText = placeholder ?? 'Select an option'
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue)
  const [searchText, setSearchText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<'down' | 'up'>('down')
  const [availableHeight, setAvailableHeight] = useState(dropdownMaxHeight)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentSelectedValue = value ?? selectedValue
  const selectedOption = options.find((option) => option.value === currentSelectedValue)
  const availableOptions = enableUnselected ? [{ label: 'No selection', value: '' }, ...options] : options
  const filteredOptions = isSercheable
    ? availableOptions.filter((option) => option.label.toLowerCase().includes(searchText.toLowerCase()))
    : availableOptions

  useEffect(() => {
    /** Closes the dropdown when interaction starts outside its container. */
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchText('')
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    const updateDropdownPosition = () => {
      const inputElement = inputRef.current
      const dropdownElement = dropdownRef.current

      if (!inputElement || !dropdownElement) {
        return
      }

      let boundaryElement = inputElement.parentElement?.parentElement ?? null

      while (boundaryElement && boundaryElement !== document.body) {
        const overflowY = getComputedStyle(boundaryElement).overflowY

        if (['auto', 'clip', 'hidden', 'scroll'].includes(overflowY)) {
          break
        }

        boundaryElement = boundaryElement.parentElement
      }

      const inputRect = inputElement.getBoundingClientRect()
      const boundaryRect = boundaryElement?.getBoundingClientRect() ?? {
        top: 0,
        bottom: window.innerHeight
      }
      const spaceBelow = Math.max(0, boundaryRect.bottom - inputRect.bottom - dropdownSafeSpacing)
      const spaceAbove = Math.max(0, inputRect.top - boundaryRect.top - dropdownSafeSpacing)
      const contentHeight = Math.min(dropdownMaxHeight, dropdownElement.scrollHeight)
      const opensDown = spaceBelow >= contentHeight
      const spaceAvailable = opensDown ? spaceBelow : spaceAbove

      setDropdownPosition(opensDown ? 'down' : 'up')
      setAvailableHeight(Math.min(dropdownMaxHeight, Math.max(1, spaceAvailable)))
    }

    updateDropdownPosition()
    window.addEventListener('resize', updateDropdownPosition)
    window.addEventListener('scroll', updateDropdownPosition, true)

    return () => {
      window.removeEventListener('resize', updateDropdownPosition)
      window.removeEventListener('scroll', updateDropdownPosition, true)
    }
  }, [enableUnselected, isOpen, filteredOptions.length, options])

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

  const handleOptionSelect = (option: SelectOptionItem) => {
    setSelectedValue(option.value)
    setIsOpen(false)
    setSearchText('')

    const changeEvent = {
      target: { name: inputProps.name ?? '', value: option.value },
      currentTarget: inputRef.current,
      type: 'change'
    } as unknown as ChangeEvent<HTMLInputElement>

    onChange?.(changeEvent)
  }

  const handleInputClick = () => {
    setIsOpen((open) => {
      setSearchText('')
      return !open
    })
  }

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (isOpen && isSercheable) {
      setSearchText(event.target.value)
    }
  }

  const inputValue = isOpen ? searchText : (selectedOption?.label ?? '')

  return (
    <div ref={containerRef} className="relative">
      <Input
        {...inputProps}
        disabled={disabled}
        ref={assignInputRef}
        value={inputValue}
        placeholder={placeholderText}
        icon={selectedOption?.icon}
        sideIcon="left"
        aria-invalid={isError || inputProps['aria-invalid']}
        className={`${isClereable ? 'pr-16' : 'pr-10'} ${className} cursor-pointer ${isOpen ? 'border-focus ring-2 ring-focus/40' : ''} ${isError ? 'border-danger-foreground focus:border-danger-foreground' : ''}`}
        readOnly={!isOpen || !isSercheable}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onChange={handleSearchChange}
        onClick={() => {
          if (!disabled) {
            handleInputClick()
          }
        }}
      />
      {isClereable && selectedOption && !disabled && (
        <button
          aria-label="Clear selection"
          className="absolute right-9 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-body focus:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
          onClick={(event) => {
            event.stopPropagation()
            handleOptionSelect({ label: 'No selection', value: '' })
          }}
          type="button"
        >
          <Icon icon="CloseOutlined" size={14} />
        </button>
      )}
      <span
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      >
        <Icon icon="DownOutlined" size={16} />
      </span>

      {isOpen && !disabled && (
        <SelectOptionDropdown
          options={filteredOptions}
          selectedValue={currentSelectedValue}
          position={dropdownPosition}
          maxHeight={availableHeight}
          dropdownRef={dropdownRef}
          onSelect={handleOptionSelect}
        />
      )}
    </div>
  )
}

export default SelectOption
