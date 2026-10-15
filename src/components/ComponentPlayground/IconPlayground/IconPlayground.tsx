'use client'

import Icon from '@/components/Icon/Icon'
import type { IconName, IconType } from '@/components/Icon/Icon'

const iconNames: IconName[] = [
  'AppstoreOutlined',
  'ArrowRightOutlined',
  'BarChartOutlined',
  'BellOutlined',
  'CheckCircleOutlined',
  'CheckSquareOutlined',
  'ClockCircleOutlined',
  'CloseCircleOutlined',
  'CloseOutlined',
  'DownOutlined',
  'EyeInvisibleOutlined',
  'EyeOutlined',
  'EllipsisOutlined',
  'FolderOpenOutlined',
  'FolderOutlined',
  'HomeOutlined',
  'LogoutOutlined',
  'MenuFoldOutlined',
  'MenuUnfoldOutlined',
  'MinusCircleOutlined',
  'PauseCircleOutlined',
  'PlusOutlined',
  'RightOutlined',
  'SearchOutlined',
  'SettingOutlined',
  'StarOutlined',
  'SyncOutlined',
  'TeamOutlined',
  'ThunderboltOutlined',
  'UnorderedListOutlined'
]

const iconTypes: IconType[] = ['outlined', 'filled', 'twoTone']
const iconSizes = [16, 20, 28, 36]
const iconColors = ['text-primary', 'text-text-muted', 'text-danger-foreground', 'text-task-completed-foreground']

/**
 * Presents the supported shared Icon configurations for visual inspection.
 *
 * @returns The isolated Icon playground.
 */
const IconPlayground = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="max-w-3xl text-text-body">
          Review the shared Icon catalog, supported Ant Design types, sizes, colors, and class-name combinations.
        </p>
      </div>

      <section className="space-y-4" aria-labelledby="icon-catalog-title">
        <h3 className="text-2xl font-semibold" id="icon-catalog-title">
          Icon catalog
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {iconNames.map((iconName) => (
            <div
              className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-surface-page p-3 text-center"
              key={iconName}
            >
              <Icon icon={iconName} size={24} />
              <span className="break-all text-xs text-text-muted">{iconName}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="icon-types-title">
        <h3 className="text-2xl font-semibold" id="icon-types-title">
          Types
        </h3>
        <div className="flex flex-wrap items-center gap-8 rounded-xl border border-border bg-surface-page p-6">
          {iconTypes.map((type) => (
            <div className="flex flex-col items-center gap-2" key={type}>
              <Icon icon="AppstoreOutlined" size={32} type={type} />
              <span className="text-sm capitalize text-text-muted">{type}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="icon-sizes-title">
        <h3 className="text-2xl font-semibold" id="icon-sizes-title">
          Sizes
        </h3>
        <div className="flex flex-wrap items-end gap-8 rounded-xl border border-border bg-surface-page p-6">
          {iconSizes.map((size) => (
            <div className="flex flex-col items-center gap-2" key={size}>
              <Icon icon="StarOutlined" size={size} />
              <span className="text-sm text-text-muted">{size}px</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="icon-colors-title">
        <h3 className="text-2xl font-semibold" id="icon-colors-title">
          Theme colors
        </h3>
        <div className="flex flex-wrap gap-8 rounded-xl border border-border bg-surface-page p-6">
          {iconColors.map((color) => (
            <div className={`flex flex-col items-center gap-2 ${color}`} key={color}>
              <Icon icon="CheckCircleOutlined" size={32} />
              <span className="text-sm text-text-muted">{color}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="icon-combinations-title">
        <h3 className="text-2xl font-semibold" id="icon-combinations-title">
          Combined configuration
        </h3>
        <div className="flex flex-wrap items-center gap-5 rounded-xl border border-border bg-surface-page p-6">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary-foreground">
            <Icon icon="AppstoreOutlined" size={24} type="filled" />
          </span>
          <span className="flex size-12 items-center justify-center rounded-xl bg-task-completed text-task-completed-foreground">
            <Icon className="drop-shadow-sm" icon="CheckCircleOutlined" size={28} type="twoTone" />
          </span>
          <span className="flex size-12 items-center justify-center rounded-xl border border-danger-border bg-danger-surface text-danger-foreground">
            <Icon icon="CloseCircleOutlined" size={24} />
          </span>
        </div>
      </section>
    </div>
  )
}

export default IconPlayground
