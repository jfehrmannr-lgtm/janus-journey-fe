import Input from '@/components/Input/Input'
import Icon from '@/components/Icon/Icon'
import SelectOption from '@/components/SelectOption/SelectOption'

/**
 * Presents the reusable Input configurations for visual inspection.
 *
 * @returns The isolated Input playground.
 */
const InputPlayground = () => {
  const manyOptions = Array.from({ length: 20 }, (_, index) => ({
    label: `Resource ${index + 1}`,
    value: `resource-${index + 1}`
  }))

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="max-w-3xl text-text-body">
          Review the reusable Input labels, supporting text, validation state, icons, and native input behavior.
        </p>
      </div>

      <section className="space-y-4" aria-labelledby="input-examples-title">
        <h3 className="text-2xl font-semibold" id="input-examples-title">
          Input
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <Input label="Task name" name="task-name" placeholder="e.g. Build the login form" required />
            <p className="text-sm text-text-muted">Required text input with a native validation attribute.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <Input
              autoComplete="email"
              helperText="We will only use this for account notifications."
              label="Email address"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <p className="text-sm text-text-muted">Email input with autocomplete and helper text.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <Input label="Password" name="password" placeholder="Enter your password" type="password" />
            <p className="text-sm text-text-muted">Password input with the built-in show and hide control.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <Input
              error="Enter a valid search term."
              icon={<Icon icon="SearchOutlined" />}
              label="Search"
              name="search"
              placeholder="Search resources"
              sideIcon="left"
            />
            <p className="text-sm text-text-muted">Search input with a leading icon and error state.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <Input
              disabled
              helperText="This field is unavailable in the current state."
              label="Disabled input"
              name="disabled"
              placeholder="Unavailable"
            />
            <p className="text-sm text-text-muted">Disabled input with supporting context.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <Input defaultValue="Uncontrolled value" name="default-value" />
            <Input name="controlled-example" value="Controlled value" readOnly />
            <p className="text-sm text-text-muted">Examples of uncontrolled and controlled native values.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="select-option-examples-title">
        <h3 className="text-2xl font-semibold" id="select-option-examples-title">
          SelectOption
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <SelectOption
              defaultValue="journey"
              name="resource-type"
              options={[
                { icon: <Icon icon="AppstoreOutlined" />, label: 'Journey', value: 'journey' },
                { icon: <Icon icon="FolderOutlined" />, label: 'Folder', value: 'folder' },
                { icon: <Icon icon="CheckSquareOutlined" />, label: 'Task', value: 'task' }
              ]}
              placeholder="Search resource types"
            />
            <p className="text-sm text-text-muted">Searchable options with icons and a selected icon preview.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <SelectOption
              defaultValue="folder"
              enableUnselected
              isClereable
              name="clearable-resource"
              options={[
                { icon: <Icon icon="AppstoreOutlined" />, label: 'Journey', value: 'journey' },
                { icon: <Icon icon="FolderOutlined" />, label: 'Folder', value: 'folder' },
                { icon: <Icon icon="CheckSquareOutlined" />, label: 'Task', value: 'task' }
              ]}
              placeholder="Select or clear a resource"
            />
            <p className="text-sm text-text-muted">Clearable selector with an explicit No selection option.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <SelectOption
              defaultValue="in-progress"
              isSercheable={false}
              name="task-state"
              options={[
                { icon: <Icon icon="ClockCircleOutlined" />, label: 'Pending', value: 'pending' },
                { icon: <Icon icon="SyncOutlined" />, label: 'In progress', value: 'in-progress' },
                { icon: <Icon icon="CheckCircleOutlined" />, label: 'Completed', value: 'completed' }
              ]}
              placeholder="Select task state"
            />
            <p className="text-sm text-text-muted">Non-searchable options for choosing from a fixed list.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5">
            <SelectOption
              defaultValue="in-progress"
              isError
              isSercheable={false}
              name="error-task-state"
              options={[
                { icon: <Icon icon="ClockCircleOutlined" />, label: 'Pending', value: 'pending' },
                { icon: <Icon icon="SyncOutlined" />, label: 'In progress', value: 'in-progress' },
                { icon: <Icon icon="CheckCircleOutlined" />, label: 'Completed', value: 'completed' }
              ]}
              placeholder="Select task state"
            />
            <p className="text-sm text-text-muted">Error styling for an invalid selection state.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5 lg:col-span-2">
            <SelectOption
              defaultValue="resource-10"
              isClereable
              name="many-resources"
              options={manyOptions}
              placeholder="Search 20 resources"
            />
            <p className="text-sm text-text-muted">A larger searchable list with 20 selectable options.</p>
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-surface-page p-5 lg:col-span-2">
            <SelectOption
              defaultValue="folder"
              disabled
              name="disabled-resource"
              options={[
                { icon: <Icon icon="AppstoreOutlined" />, label: 'Journey', value: 'journey' },
                { icon: <Icon icon="FolderOutlined" />, label: 'Folder', value: 'folder' }
              ]}
              placeholder="Unavailable resource selector"
            />
            <p className="text-sm text-text-muted">Disabled selector state.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InputPlayground
