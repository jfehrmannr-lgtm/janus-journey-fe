import type { RefObject } from 'react'
import type { SelectOptionItem } from './selectOption.types'

const dropdownOptionClasses =
  'flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20'

interface SelectOptionDropdownProps {
  options: SelectOptionItem[]
  selectedValue: string
  position: 'down' | 'up'
  maxHeight: number
  dropdownRef: RefObject<HTMLDivElement | null>
  onSelect: (option: SelectOptionItem) => void
}

/**
 * Renders the positioned, scrollable options list for SelectOption.
 *
 * @param options Filtered options displayed in the list.
 * @param selectedValue Currently selected option value.
 * @param position Direction in which the list opens.
 * @param maxHeight Maximum available list height.
 * @param dropdownRef Ref attached to the list container.
 * @param onSelect Callback invoked when an option is selected.
 * @returns The custom dropdown options container.
 */
const SelectOptionDropdown = ({
  options,
  selectedValue,
  position,
  maxHeight,
  dropdownRef,
  onSelect
}: SelectOptionDropdownProps) => {
  return (
    <div
      ref={dropdownRef}
      className={`absolute left-0 z-30 w-full overflow-y-auto rounded-lg border border-border bg-surface p-1.5 shadow-lg ${position === 'down' ? 'top-full mt-1' : 'bottom-full mb-1'}`}
      style={{ maxHeight }}
      role="listbox"
      aria-label="Select an option"
    >
      {options.length > 0 ? (
        options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${dropdownOptionClasses} ${option.value === selectedValue ? 'bg-primary-soft text-primary-foreground' : 'text-text-body'}`}
            role="option"
            aria-selected={option.value === selectedValue}
            onClick={() => onSelect(option)}
          >
            {option.icon !== undefined && <span className="shrink-0 text-text-muted">{option.icon}</span>}
            {option.label}
          </button>
        ))
      ) : (
        <p className="px-3 py-2.5 text-sm text-text-muted" role="status">
          No options found
        </p>
      )}
    </div>
  )
}

export default SelectOptionDropdown
