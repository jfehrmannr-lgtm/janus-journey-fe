'use client'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'

interface DashboardHeadProps {
  username: string
  onCreateJourney: () => void
}

/**
 * Renders the Dashboard greeting and root-resource creation actions.
 *
 * @param username - Personalized name displayed in the greeting.
 * @param onCreateJourney - Callback that opens the Journey creation workflow.
 * @returns The responsive Dashboard header.
 */
const DashboardHead = ({ username, onCreateJourney }: DashboardHeadProps) => {
  return (
    <header className="rounded-2xl border border-border bg-surface p-2 sm:px-6 sm:py-4">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            Good morning, {username}
          </h1>
          <p className="mt-2 text-base text-text-body ">What would you like to work on today?</p>
        </div>
        <div className="flex space-x-2">
          <div>
            <Button
              buttonSize="normal"
              icon={<Icon icon="PlusOutlined" />}
              label="Journey"
              onClick={onCreateJourney}
              size="md"
            />
          </div>
          <div>
            <Button
              buttonSize="normal"
              color="neutral"
              icon={<Icon icon="FolderOutlined" />}
              label="Folder"
              size="md"
              variant="outlined"
            />
          </div>
          <div>
            <Button
              buttonSize="normal"
              color="neutral"
              icon={<Icon icon="CheckSquareOutlined" />}
              label="Task"
              size="md"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHead
