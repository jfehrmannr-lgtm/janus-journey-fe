'use client'

import {
  AppstoreOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'

const iconComponents = {
  AppstoreOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined
}

export type IconName =
  | 'AppstoreOutlined'
  | 'ArrowRightOutlined'
  | 'BarChartOutlined'
  | 'BellOutlined'
  | 'CheckCircleOutlined'
  | 'CheckSquareOutlined'
  | 'ClockCircleOutlined'
  | 'CloseOutlined'
  | 'DownOutlined'
  | 'EyeInvisibleOutlined'
  | 'EyeOutlined'
  | 'FolderOpenOutlined'
  | 'FolderOutlined'
  | 'HomeOutlined'
  | 'LogoutOutlined'
  | 'MenuFoldOutlined'
  | 'MenuUnfoldOutlined'
  | 'MinusCircleOutlined'
  | 'PlusOutlined'
  | 'RightOutlined'
  | 'SearchOutlined'
  | 'SettingOutlined'
  | 'StarOutlined'
  | 'TeamOutlined'
  | 'ThunderboltOutlined'
  | 'UnorderedListOutlined'

export type IconType = 'outlined' | 'filled' | 'twoTone'

interface IconProps {
  className?: string
  color?: string
  icon: IconName
  size?: number
  type?: IconType
}

/**
 * Renders a supported Ant Design icon behind the shared client-side icon boundary.
 *
 * @param className - Additional classes appended to the base icon class.
 * @param color - Optional inline icon color.
 * @param icon - Typed identifier for the supported Ant Design icon.
 * @param size - Optional icon size in pixels.
 * @param type - Optional supported Ant Design icon variant metadata.
 * @returns The requested Ant Design icon.
 */
const Icon = ({ className, color, icon, size, type }: IconProps) => {
  const IconComponent = iconComponents[icon]
  const classes = ['icon', className].filter(Boolean).join(' ')
  const style = {
    ...(color === undefined ? {} : { color }),
    ...(size === undefined ? {} : { fontSize: `${size}px` })
  }

  return <IconComponent aria-hidden="true" className={classes} data-icon-type={type} style={style} />
}

export default Icon
