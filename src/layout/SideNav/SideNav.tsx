'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import BrandLogo from '@/components/BrandLogo/BrandLogo'
import Icon from '@/components/Icon/Icon'
import { authClient } from '@/services/authClient'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const isSideNavCollapsed = useAppUiStore((state) => state.isSideNavCollapsed)
  const toggleSideNav = useAppUiStore((state) => state.toggleSideNav)
  const selectedResourceType = useAppUiStore((state) => state.selectedResourceType)
  const selectedResourceUid = useAppUiStore((state) => state.selectedResourceUid)
  const selectResource = useAppUiStore((state) => state.selectResource)
  const showExpandedContent = isMobileMenuOpen || !isSideNavCollapsed
  const displayName = session?.user.name ?? 'Janus User'
  const userInitials = displayName.slice(0, 2).toUpperCase()

  /**
   * Ends the Better Auth session and returns to the public root route.
   *
   * @returns A promise that resolves after the session is cleared.
   */
  const handleLogout = async () => {
    await authClient.signOut()
    router.replace('/')
    router.refresh()
  }

  const navigationItems = [
    { label: 'Home', icon: <Icon icon="HomeOutlined" />, active: true },
    { label: 'My Tasks', icon: <Icon icon="CheckSquareOutlined" />, badge: resources.rootTasks.length },
    { label: 'Favorites', icon: <Icon icon="StarOutlined" /> },
    { label: 'Explore', icon: <Icon icon="AppstoreOutlined" /> }
  ]

  return (
    <>
      <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 lg:hidden">
        <BrandLogo />
        <button
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          className="flex size-10 items-center justify-center rounded-lg text-text-body transition-colors hover:bg-surface-subtle hover:text-text-primary"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <Icon icon="MenuUnfoldOutlined" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-surface-inverse/30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          type="button"
        />
      )}

      <aside
        data-mobile-nav-open={isMobileMenuOpen ? true : undefined}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-80 max-w-[calc(100vw-2rem)] -translate-x-full transform flex-col border-r border-border bg-surface py-5 shadow-2xl transition-transform lg:sticky lg:top-0 lg:h-screen lg:max-h-screen lg:shrink-0 lg:translate-x-0 lg:border-b-0 lg:pb-6 lg:shadow-none ${isMobileMenuOpen ? 'translate-x-0' : ''} ${isSideNavCollapsed ? 'lg:w-16' : 'lg:w-72 px-4'}`}
      >
        <div className={`flex items-center gap-3 ${isSideNavCollapsed ? 'justify-center' : 'justify-between'}`}>
          {showExpandedContent && (
            <Link className="text-xl font-semibold tracking-tight text-text-primary" href="/dashboard/home">
              <BrandLogo size="sm" />
            </Link>
          )}
          <button
            aria-label="Close navigation"
            className="flex size-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-strong lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            type="button"
          >
            <Icon icon="CloseOutlined" />
          </button>
          <button
            aria-label={isSideNavCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            className="hidden size-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-strong lg:flex"
            onClick={toggleSideNav}
            type="button"
          >
            {isSideNavCollapsed ? <Icon icon="MenuUnfoldOutlined" /> : <Icon icon="MenuFoldOutlined" />}
          </button>
        </div>

        {showExpandedContent && (
          <>
            <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
              <nav aria-label="Primary navigation" className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${item.active ? 'bg-primary-soft text-primary-foreground' : 'text-text-body hover:bg-surface-subtle hover:text-text-primary'}`}
                    href={item.active ? '/dashboard/home' : '#'}
                    key={item.label}
                  >
                    <span className="flex size-5 items-center justify-center text-base">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && <span className="text-xs text-text-subtle">{item.badge}</span>}
                  </Link>
                ))}
              </nav>

              <div className="mt-8">
                <div className="flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-text-subtle">
                  <span>Journeys</span>
                  <button className="text-text-muted hover:text-text-strong" type="button">
                    <Icon icon="DownOutlined" />
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {resources.journeys.map((journey) => (
                    <JourneyAccordionItem journey={journey} key={journey.uid} />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-text-subtle">
                  <span>Folders</span>
                  <Icon icon="FolderOutlined" />
                </div>
                <div className="mt-2 space-y-1">
                  {resources.rootFolders.map((folder) => {
                    const isSelected = selectedResourceType === 'folder' && selectedResourceUid === folder.uid

                    return (
                      <div key={folder.uid}>
                        <button
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${isSelected ? 'bg-primary-soft font-semibold text-primary-foreground' : 'text-text-body hover:bg-surface-subtle hover:text-text-primary'}`}
                          onClick={() => selectResource(folder.uid, 'folder')}
                          type="button"
                        >
                          <Icon className="text-text-subtle" icon="FolderOutlined" />
                          <span className="truncate">{folder.name}</span>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-1 border-t border-border-subtle pt-4">
              <div className="flex">
                <button
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-body transition-colors hover:bg-surface-subtle hover:text-text-primary"
                  type="button"
                >
                  <Icon icon="SettingOutlined" />
                  Settings
                </button>
                <button
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-body transition-colors hover:bg-surface-subtle hover:text-text-primary"
                  onClick={handleLogout}
                  type="button"
                >
                  <Icon icon="LogoutOutlined" />
                  Log out
                </button>
              </div>
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                  {userInitials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-strong">{displayName}</p>
                  <p className="truncate text-xs text-text-subtle">{session?.user.email ?? 'user@example.com'}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default SideNav
