import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'

interface JourneyOptionsProps {
  journeyName: string
}

/**
 * Renders the presentational options panel for an existing Journey.
 *
 * @param journeyName - Name of the selected Journey.
 * @returns The Journey options interface.
 */
const JourneyOptions = ({ journeyName }: JourneyOptionsProps) => {
  return (
    <section className="w-100" aria-labelledby="journey-options-title">
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
