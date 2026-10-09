import { useHotkey } from '@tanstack/react-hotkeys'
import {
  Link,
  useLocation,
  useNavigate,
  useRouter
} from '@tanstack/react-router'
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'

import { Drawer, Surface, Tabs, useMediaQuery } from '@vezham/react-v3'

import { AppIcon } from '../../components/app-icon'
import { ShortcutButton } from '../../components/shortcut-key'
import {
  useSidebarShortcut,
  useWorkspaceNavigation
} from '../../components/workspace-navigation'
import type { AppNavigationItem } from '../../navigation'
import {
  type SectionAction,
  SectionActiveFilters,
  type SectionFilterKey,
  type SectionSearch,
  SectionToolbar,
  type SectionViewAction,
  type SectionViewMode
} from './toolbar'

export type SectionLayoutProps = {
  title: string
  navigationLabel?: string
  sidebarItems?: AppNavigationItem[]
  tabs: AppNavigationItem[]
  toolbar?: ReactNode
  search?: SectionSearch
  sync?: boolean
  view?: SectionViewAction[]
  onSync?: () => void
  menuActions?: SectionAction[]
  primaryAction?: SectionAction
  children: ReactNode
}

const EMPTY_SIDEBAR_ITEMS: AppNavigationItem[] = []
const EMPTY_MENU_ACTIONS: SectionAction[] = []
const EMPTY_VIEW_ACTIONS: SectionViewAction[] = []

const matchesPath = (pathname: string, href?: string) =>
  Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)))

const SectionLayout = ({
  title,
  navigationLabel = `${title} sections`,
  sidebarItems = EMPTY_SIDEBAR_ITEMS,
  tabs,
  toolbar,
  search,
  sync = true,
  view = EMPTY_VIEW_ACTIONS,
  onSync,
  menuActions = EMPTY_MENU_ACTIONS,
  primaryAction,
  children
}: SectionLayoutProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const router = useRouter()
  const { isNavigationCollapsed, toggleNavigation, registerMobileSidebar } =
    useWorkspaceNavigation()
  const isCompactToolbar = useMediaQuery('(max-width: 767px)')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<SectionFilterKey[]>([])
  const [viewMode, setViewMode] = useState<SectionViewMode>('grid')
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
  const toggleMobileSidebar = useCallback(
    () => setIsDrawerOpen(open => !open),
    []
  )
  const handleSync = useCallback(() => onSync?.(), [onSync])
  useEffect(() => {
    if (hasSidebar) {
      return registerMobileSidebar({
        isOpen: isDrawerOpen,
        onToggle: toggleMobileSidebar
      })
    }
    return undefined
  }, [hasSidebar, isDrawerOpen, registerMobileSidebar, toggleMobileSidebar])
  const sidebarId = useId()
  const toggleSidebar = () => {
    if (hasSidebar && !window.matchMedia('(min-width: 768px)').matches) {
      toggleMobileSidebar()
    } else {
      toggleNavigation()
    }
  }
  useSidebarShortcut(toggleSidebar)
  useHotkey('Meta+ArrowLeft', () => router.history.back())
  useHotkey('Meta+ArrowRight', () => router.history.forward())
  useHotkey(
    'Meta+R',
    () => {
      onSync?.()
    },
    { enabled: sync && Boolean(onSync) }
  )
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
        isNavigationCollapsed={isNavigationCollapsed}
        sync={sync}
        view={view}
        selectedFilters={selectedFilters}
        onSelectedFiltersChange={setSelectedFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        tabs={isCompactToolbar ? [] : tabs}
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
        onSync={handleSync}
        navigationControls={
          <>
            {!isNavigationCollapsed && (
              <ShortcutButton
                className="h-9 w-9 min-w-9 p-0"
                label="Hide Sidebar"
                shortcut="⌘ S"
                aria-keyshortcuts="Meta+S"
                aria-controls={sidebarId}
                aria-expanded
                onPress={toggleNavigation}>
                <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
              </ShortcutButton>
            )}
            <ShortcutButton
              className="hidden h-9 w-9 min-w-9 p-0 lg:inline-flex"
              label="Back"
              shortcut="⌘ ←"
              aria-keyshortcuts="Meta+ArrowLeft"
              onPress={() => router.history.back()}>
              <AppIcon icon="vx:arrow-left" size={18} aria-hidden="true" />
            </ShortcutButton>
            <ShortcutButton
              className="hidden h-9 w-9 min-w-9 p-0 lg:inline-flex"
              label="Forward"
              shortcut="⌘ →"
              aria-keyshortcuts="Meta+ArrowRight"
              onPress={() => router.history.forward()}>
              <AppIcon icon="vx:arrow-right" size={18} aria-hidden="true" />
            </ShortcutButton>
          </>
        }
      />
      {isCompactToolbar && tabs.length > 0 && (
        <Tabs.ListContainer className="scrollbar-hide order-2 mb-3 w-fit max-w-full min-w-0 self-center overflow-x-auto rounded-full">
          <Tabs.List
            aria-label={`${title} tabs`}
            className="flex min-w-max flex-nowrap *:whitespace-nowrap">
            {tabs.map(tab => (
              <Tabs.Tab
                key={tab.key}
                id={tab.key}
                className="whitespace-nowrap">
                {tab.title}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      )}
      <div className="order-1 flex min-h-0 flex-1">
        {hasSidebar && !isNavigationCollapsed && (
          <aside
            id={sidebarId}
            className="hidden w-56 shrink-0 overflow-y-auto md:block">
            {sidebar}
          </aside>
        )}
        <main className="flex min-w-0 flex-1 flex-col gap-2 overflow-auto p-4">
          <SectionActiveFilters
            selectedFilters={selectedFilters}
            onSelectedFiltersChange={setSelectedFilters}
          />
          <Surface className="min-h-0 flex-1 rounded-lg p-4 sm:p-5">
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

export type {
  SectionAction,
  SectionFilterKey,
  SectionSearch,
  SectionViewAction,
  SectionViewMode
} from './toolbar'
export { SectionLayout }
