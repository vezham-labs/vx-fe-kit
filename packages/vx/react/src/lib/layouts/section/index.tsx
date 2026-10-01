import { useHotkey } from '@tanstack/react-hotkeys'
import {
  Link,
  useLocation,
  useNavigate,
  useRouter
} from '@tanstack/react-router'
import { type ReactNode, useId, useRef, useState } from 'react'

import { Drawer, Surface, Tabs } from '@vezham/react-v3'

import { AppIcon } from '../../components/app-icon'
import { ShortcutButton } from '../../components/shortcut-key'
import {
  useSidebarShortcut,
  useWorkspaceNavigation
} from '../../components/workspace-navigation'
import type { AppNavigationItem } from '../../navigation'
import {
  type SectionAction,
  type SectionSearch,
  SectionToolbar
} from './toolbar'

export type SectionLayoutProps = {
  title: string
  navigationLabel?: string
  sidebarItems?: AppNavigationItem[]
  tabs: AppNavigationItem[]
  toolbar?: ReactNode
  search?: SectionSearch
  menuActions?: SectionAction[]
  primaryAction?: SectionAction
  children: ReactNode
}

const matchesPath = (pathname: string, href?: string) =>
  Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)))

const SectionLayout = ({
  title,
  navigationLabel = `${title} sections`,
  sidebarItems = [],
  tabs,
  toolbar,
  search,
  menuActions = [],
  primaryAction,
  children
}: SectionLayoutProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const router = useRouter()
  const { isNavigationCollapsed, toggleNavigation } = useWorkspaceNavigation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  useHotkey(
    'Mod+K',
    () => {
      if (window.matchMedia('(min-width: 768px)').matches)
        searchInput.current?.focus()
      else setIsSearchOpen(true)
    },
    { enabled: Boolean(search) }
  )
  const selectedTab =
    tabs.find(tab => matchesPath(pathname, tab.href)) ?? tabs[0]
  const hasSidebar = sidebarItems.length > 0
  const sidebarId = useId()
  useSidebarShortcut(() => {
    if (hasSidebar && !window.matchMedia('(min-width: 768px)').matches) {
      setIsDrawerOpen(open => !open)
    } else {
      toggleNavigation()
    }
  })
  useHotkey('Meta+ArrowLeft', () => router.history.back())
  useHotkey('Meta+ArrowRight', () => router.history.forward())
  useHotkey('Meta+R', () => {
    void router.invalidate()
  })
  const sidebar = (
    <nav aria-label={navigationLabel} className="space-y-1 p-2">
      {sidebarItems.map(item => {
        const isActive =
          matchesPath(pathname, item.href) ||
          item.children?.some(child => matchesPath(pathname, child.href))
        return (
          <Link
            key={item.key}
            to={item.href ?? item.children?.[0]?.href ?? '/'}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setIsDrawerOpen(false)}
            className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm ${isActive ? 'bg-surface-secondary text-foreground font-bold' : 'text-muted hover:bg-surface-secondary'}`}>
            {item.icon && (
              <AppIcon icon={item.icon} size={18} aria-hidden="true" />
            )}
            {item.title}
          </Link>
        )
      })}
    </nav>
  )

  const content = (
    <>
      <SectionToolbar
        title={title}
        tabs={tabs}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        search={
          search
            ? {
                ...search,
                inputRef: searchInput,
                isOpen: isSearchOpen,
                onOpenChange: setIsSearchOpen
              }
            : undefined
        }
        menuActions={menuActions}
        primaryAction={primaryAction}
        toolbar={toolbar}
        onRefresh={() => {
          void router.invalidate()
        }}
        navigationControls={
          <>
            <ShortcutButton
              className={
                hasSidebar
                  ? 'hidden h-9 w-9 min-w-9 p-0 md:flex'
                  : 'h-9 w-9 min-w-9 p-0'
              }
              label={isNavigationCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}
              shortcut="⌘ S"
              aria-keyshortcuts="Meta+S"
              aria-controls={sidebarId}
              aria-expanded={!isNavigationCollapsed}
              onPress={toggleNavigation}>
              <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
            </ShortcutButton>
            {hasSidebar && (
              <ShortcutButton
                className="h-9 w-9 min-w-9 p-0 md:hidden"
                label={isDrawerOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                shortcut="⌘ S"
                aria-keyshortcuts="Meta+S"
                aria-expanded={isDrawerOpen}
                onPress={() => setIsDrawerOpen(open => !open)}>
                <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
              </ShortcutButton>
            )}
            <ShortcutButton
              className="h-9 w-9 min-w-9 p-0"
              label="Back"
              shortcut="⌘ ←"
              aria-keyshortcuts="Meta+ArrowLeft"
              onPress={() => router.history.back()}>
              <AppIcon icon="vx:arrow-left" size={18} aria-hidden="true" />
            </ShortcutButton>
            <ShortcutButton
              className="h-9 w-9 min-w-9 p-0"
              label="Forward"
              shortcut="⌘ →"
              aria-keyshortcuts="Meta+ArrowRight"
              onPress={() => router.history.forward()}>
              <AppIcon icon="vx:arrow-right" size={18} aria-hidden="true" />
            </ShortcutButton>
          </>
        }
      />
      <div className="flex min-h-0 flex-1">
        {hasSidebar && !isNavigationCollapsed && (
          <aside
            id={sidebarId}
            className="hidden w-56 shrink-0 overflow-y-auto md:block">
            {sidebar}
          </aside>
        )}
        <main className="min-w-0 flex-1 overflow-auto p-4">
          <Surface className="min-h-full rounded-lg p-4 sm:p-5">
            {tabs.length === 0 && children}
            {tabs.map(tab => (
              <Tabs.Panel key={tab.key} id={tab.key}>
                {tab.key === selectedTab?.key && children}
              </Tabs.Panel>
            ))}
          </Surface>
        </main>
      </div>
    </>
  )

  return (
    <div className="bg-background flex h-full min-h-0 min-w-0 flex-1 flex-col">
      {tabs.length > 0 ? (
        <Tabs
          // vx-bot/NOTE: Each section owns its tab collection and indicator measurements.
          key={JSON.stringify(tabs.map(tab => tab.key))}
          selectedKey={selectedTab?.key}
          onSelectionChange={key => {
            const tab = tabs.find(item => item.key === key)
            if (tab?.href) void navigate({ to: tab.href })
          }}
          className="flex min-h-0 flex-1 flex-col">
          {content}
        </Tabs>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">{content}</div>
      )}

      {hasSidebar && (
        <Drawer.Backdrop isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-background w-[min(20rem,calc(100vw-2rem))]">
              <Drawer.Header>
                <Drawer.Heading>{title}</Drawer.Heading>
                <Drawer.CloseTrigger aria-label="Hide Sidebar" />
              </Drawer.Header>
              <Drawer.Body>{sidebar}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      )}
    </div>
  )
}

export { SectionLayout }
export type { SectionAction, SectionSearch } from './toolbar'
