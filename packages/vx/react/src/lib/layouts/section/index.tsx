import {
  Link,
  useLocation,
  useNavigate,
  useRouter
} from '@tanstack/react-router'
import { type ReactNode, useState } from 'react'

import { Button, Drawer, Surface, Tabs } from '@vezham/react-v3'

import { AppIcon } from '../../components/app-icon'
import { useWorkspaceNavigation } from '../../components/workspace-navigation'
import type { AppNavigationItem } from '../../navigation'

export type SectionLayoutProps = {
  title: string
  navigationLabel?: string
  sidebarItems?: AppNavigationItem[]
  tabs: AppNavigationItem[]
  toolbar?: ReactNode
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
  children
}: SectionLayoutProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const router = useRouter()
  const { isNavigationCollapsed, toggleNavigation } = useWorkspaceNavigation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const selectedTab =
    tabs.find(tab => matchesPath(pathname, tab.href)) ?? tabs[0]
  const hasSidebar = sidebarItems.length > 0
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
      <header className="flex shrink-0 flex-wrap items-center gap-1 px-3 py-2 sm:px-4">
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          className={hasSidebar ? 'hidden md:flex' : undefined}
          aria-label={
            isNavigationCollapsed
              ? 'Expand section navigation'
              : 'Collapse section navigation'
          }
          aria-expanded={!isNavigationCollapsed}
          onPress={toggleNavigation}>
          <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
        </Button>
        {hasSidebar && (
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label="Open section sidebar"
            aria-expanded={isDrawerOpen}
            onPress={() => setIsDrawerOpen(true)}>
            <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
          </Button>
        )}
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          aria-label="Back"
          onPress={() => router.history.back()}>
          <AppIcon icon="vx:arrow-left" size={18} aria-hidden="true" />
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          aria-label="Forward"
          onPress={() => router.history.forward()}>
          <AppIcon icon="vx:arrow-right" size={18} aria-hidden="true" />
        </Button>
        {tabs.length > 0 && (
          <Tabs.ListContainer className="min-w-0 flex-1">
            <Tabs.List aria-label={`${title} tabs`}>
              {tabs.map(tab => (
                <Tabs.Tab key={tab.key} id={tab.key}>
                  {tab.title}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        )}
        {tabs.length === 0 && (
          <h2 className="min-w-0 flex-1 px-2 font-medium">{title}</h2>
        )}
        {toolbar}
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          aria-label="Refresh section"
          onPress={() => {
            void router.invalidate()
          }}>
          <AppIcon icon="vx:refresh" size={18} aria-hidden="true" />
        </Button>
      </header>
      <div className="flex min-h-0 flex-1">
        {hasSidebar && !isNavigationCollapsed && (
          <aside className="hidden w-56 shrink-0 overflow-y-auto md:block">
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
                <Drawer.CloseTrigger />
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
