'use client'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import useAppUiStore from '@/stores/appUiStore'

interface JourneyOptionsProps {
  journeyName: string
  onClose?: () => void
}

/**
 * Renders the presentational options panel for an existing Journey.
 *
 * @param journeyName - Name of the selected Journey.
 * @param onClose - Callback that closes the Journey options dropdown.
 * @returns The Journey options interface.
 */
const JourneyOptions = ({ journeyName, onClose }: JourneyOptionsProps) => {
  const startResourceSelection = useAppUiStore((state) => state.startResourceSelection)

  const handleSelectResources = () => {
    if (onClose) onClose()
    startResourceSelection()
  }

  return (
    <section aria-labelledby="journey-options-title">
      <header className="flex items-start justify-between gap-4 border-b border-border-subtle">
        <div className="py-2 px-2">
          <h1 className=" font-semibold tracking-tight text-text-primary" id="journey-options-title">
            Journey options
          </h1>
          <p className="mt-1 truncate text-sm text-text-muted">{journeyName}</p>
        </div>
      </header>

      <div className="">
        <div className="space-y-1">
          <Button
            buttonSize="normal"
            className="justify-start border-transparent text-text-body hover:bg-surface-subtle"
            color="neutral"
            icon={<Icon className="text-text-muted" icon="EditOutlined" />}
            label="Edit Journey"
            size="full"
            type="button"
            variant="outlined"
          />
          <Button
            buttonSize="normal"
            className="justify-start border-transparent text-text-body hover:bg-surface-subtle"
            color="neutral"
            icon={<Icon className="text-text-muted" icon="UnorderedListOutlined" />}
            label="Select Resources"
            onClick={handleSelectResources}
            size="full"
            type="button"
            variant="outlined"
          />
          <Button
            buttonSize="normal"
            className="justify-start border-transparent text-text-body hover:bg-surface-subtle"
            color="neutral"
            icon={<Icon className="text-text-muted" icon="ShareAltOutlined" />}
            label="Share Journey"
            size="full"
            type="button"
            variant="outlined"
          />
        </div>

        <div className="py-1 border-t border-border-subtle ">
          <Button
            buttonSize="normal"
            className="justify-start border-transparent text-danger-foreground hover:bg-danger-surface"
            color="danger"
            icon={<Icon icon="DeleteOutlined" />}
            label="Delete Journey"
            size="full"
            type="button"
            variant="outlined"
          />
        </div>
      </div>
    </section>
  )
}

export default JourneyOptions
