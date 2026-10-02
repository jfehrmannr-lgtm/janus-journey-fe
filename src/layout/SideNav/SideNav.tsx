'use client'

import {
  AppstoreOutlined,
  CheckSquareOutlined,
  DownOutlined,
  FolderOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  StarOutlined
} from '@ant-design/icons'
import Link from 'next/link'

import useUserQuery from '@/hooks/useUserQuery'
import useAppUiStore from '@/stores/appUiStore'
import type { NavigationRootResources } from '@/types/resources'
import JourneyAccordionItem from '@/layout/SideNav/JourneyAccordionItem'

interface SideNavProps {
  resources: NavigationRootResources
}

/**
 * Renders persistent application navigation and flat root resource sections.
 *
 * @param resources - Root Journeys, Folders, and Tasks available to the User.
 * @returns The application SideNav.
 */
const SideNav = ({ resources }: SideNavProps) => {
  const { data: user } = useUserQuery()
  const isSideNavCollapsed = useAppUiStore((state) => state.isSideNavCollapsed)
  const toggleSideNav = useAppUiStore((state) => state.toggleSideNav)

  const navigationItems = [
    { label: 'Home', icon: <HomeOutlined />, active: true },
    { label: 'My Tasks', icon: <CheckSquareOutlined />, badge: resources.rootTasks.length },
    { label: 'Favorites', icon: <StarOutlined /> },
    { label: 'Explore', icon: <AppstoreOutlined /> }
  ]

  return (
    <aside
      className={`flex max-h-[45rem] flex-col border-b border-slate-200 bg-white px-4 py-5 lg:sticky lg:top-0 lg:h-screen lg:max-h-screen lg:shrink-0 lg:border-b-0 lg:border-r lg:py-6 ${isSideNavCollapsed ? 'lg:w-20' : 'lg:w-72'}`}
    >
      <div className="flex items-center justify-between gap-3 px-2">
        {!isSideNavCollapsed && (
          <Link className="text-xl font-semibold tracking-tight text-slate-950" href="/dashboard/home">
            Janus Journey
          </Link>
        )}
        <button
          aria-label={isSideNavCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          className="flex size-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          onClick={toggleSideNav}
          type="button"
        >
          {isSideNavCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {!isSideNavCollapsed && (
        <>
          <nav aria-label="Primary navigation" className="mt-8 space-y-1">
            {navigationItems.map((item) => (
              <Link
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${item.active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
                href={item.active ? '/dashboard/home' : '#'}
                key={item.label}
              >
                <span className="flex size-5 items-center justify-center text-base">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && <span className="text-xs text-slate-400">{item.badge}</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Journeys</span>
              <button className="text-slate-500 hover:text-slate-900" type="button">
                <DownOutlined />
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {resources.journeys.map((journey) => (
                <JourneyAccordionItem journey={journey} key={journey.uid} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Folders</span>
              <FolderOutlined />
            </div>
            <div className="mt-2 space-y-1">
              {resources.rootFolders.map((folder) => (
                <button
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
                  key={folder.uid}
                  type="button"
                >
                  <FolderOutlined className="text-slate-400" />
                  <span className="truncate">{folder.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-1 border-t border-slate-100 pt-4">
            <button
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
              type="button"
            >
              <SettingOutlined />
              Settings
            </button>
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {user?.config.username.slice(0, 2).toUpperCase() ?? 'JJ'}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{user?.config.username ?? 'Janus User'}</p>
                <p className="truncate text-xs text-slate-400">{user?.email ?? 'user@example.com'}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

export default SideNav
