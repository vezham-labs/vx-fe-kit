import { useLocation } from '@tanstack/react-router'
import { useState } from 'react'

import { Surface } from '@vezham/react-v3'

import { useCommand } from '../../components/command'
import { Footer } from '../../components/panel/footer'
import { aiPanel } from '../../components/panel/footer/ai'
import { ControlCenterDrawer } from '../../components/panel/footer/control-center'
import { NotificationDrawer } from '../../components/panel/footer/notification-center'
import { UserInfoModal } from '../../components/panel/footer/preferences/modal'
import { Header } from '../../components/panel/header'
import { bookmarksPanel } from '../../components/panel/header/bookmarks'
import { discPanel } from '../../components/panel/header/disc'
import {
  InfoPanelContainer,
  useInfoPanel
} from '../../components/panel/info-panel'
import { Menu } from '../../components/panel/menu'
import { useWorkspaceNavigation } from '../../components/workspace-navigation'
import type { AppNavigationItem } from '../../navigation'
import { getSelectedMenuKey } from '../../navigation'
import { useUser } from '../../store/users/useUserStore'
import { HomeNavigationBubble } from './home-navigation-bubble'

const headerUsers = {
  id: '1',
  name: 'Slack',
  avatar:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
}

const MenuMD = ({ items }: { items: AppNavigationItem[] }) => {
  const [openSettings, setOpenSettings] = useState(false)
  const [settingsEntryPoint, setSettingsEntryPoint] = useState('account')
  const location = useLocation()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const { openInfoPanel, closeInfoPanel } = useInfoPanel()
  const { closeCommand } = useCommand()
  const { expandNavigation, isNavigationCollapsed: isWorkspaceCollapsed } =
    useWorkspaceNavigation()
  // vx-bot/NOTE: Home collapse state is independent from module sidebars.
  const [isHomeCollapsed, setIsHomeCollapsed] = useState(false)
  const isHome = location.pathname === (items[0]?.href ?? '/')
  const isNavigationCollapsed = isHome ? isHomeCollapsed : isWorkspaceCollapsed
  // vx-bot/NOTE: Preserve the Home gutter while its floating bubble is visible.
  const navigationWidth = isHome || !isNavigationCollapsed ? 'w-[106px]' : 'w-0'

  const collapseHomeNavigation = () => {
    setIsHomeCollapsed(true)
    closeInfoPanel()
    closeCommand()
    setOpenSettings(false)
    setNotificationsOpen(false)
    setControlsOpen(false)
  }

  const selectedKey = getSelectedMenuKey(location.pathname, items)

  const { user } = useUser()
  const footerUser = {
    id: user?.id ?? '',
    name: user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : '',
    avatar: user?.avatar,
    isOnline: user?.isOnline
  }

  return (
    <>
      <NavigationPanel
        collapsed={isNavigationCollapsed}
        footerUser={footerUser}
        items={items}
        navigationWidth={navigationWidth}
        selectedKey={selectedKey}
        onAI={() => openInfoPanel('ai')}
        onCollapse={isHome ? collapseHomeNavigation : undefined}
        onControlCenter={() => setControlsOpen(true)}
        onNotifications={() => setNotificationsOpen(true)}
        onUser={entryPoint => {
          setSettingsEntryPoint(entryPoint)
          setOpenSettings(true)
        }}
      />
      <CollapsedNavigation
        collapsed={isNavigationCollapsed}
        isHome={isHome}
        onExpandHome={() => setIsHomeCollapsed(false)}
        onExpandModule={expandNavigation}
      />
      <UserInfoModal
        open={openSettings && !isNavigationCollapsed}
        onClose={() => setOpenSettings(false)}
        defaultActiveTab={settingsEntryPoint}
      />
      <ControlCenterDrawer
        isOpen={controlsOpen && !isNavigationCollapsed}
        onClose={() => setControlsOpen(false)}
      />
      <NotificationDrawer
        isOpen={notificationsOpen && !isNavigationCollapsed}
        onClose={() => setNotificationsOpen(false)}
      />
      <InfoPanelContainer
        panels={{
          bookmarks: bookmarksPanel,
          disc: discPanel,
          ai: aiPanel
        }}
      />
    </>
  )
}

type Props = {
  collapsed: boolean
  footerUser: {
    id: string
    name: string
    avatar?: string
    isOnline?: boolean
  }
  items: AppNavigationItem[]
  navigationWidth: string
  selectedKey?: string
  onAI: () => void
  onCollapse?: () => void
  onControlCenter: () => void
  onNotifications: () => void
  onUser: (entryPoint: string) => void
}

const NavigationPanel = ({
  collapsed,
  footerUser,
  items,
  navigationWidth,
  selectedKey,
  onAI,
  onCollapse,
  onControlCenter,
  onNotifications,
  onUser
}: Props) => (
  <Surface
    variant="transparent"
    className={`border-default-300 sticky top-0 left-0 z-[10] flex h-[100dvh] shrink-0 flex-col overflow-hidden transition-[width,padding,gap] duration-300 ease-out ${navigationWidth} ${
      collapsed ? 'border-0 p-0' : 'gap-6 px-4 pt-4 pb-6'
    }`}
    data-vx="menu-layout">
    {!collapsed && (
      <>
        <Header
          users={headerUsers}
          showSearch
          showBookamarks
          showDisk
          onCollapseNavigation={onCollapse}
        />
        <Menu collapsed={false} items={items} selectedKey={selectedKey} />
        <Footer
          user={footerUser}
          showAI
          showControlCenter
          showNotifications
          showUserInfo
          onAI={onAI}
          onControlCenterClick={onControlCenter}
          onNotificationsClick={onNotifications}
          onUserClick={(_user, entryPoint = 'account') => onUser(entryPoint)}
        />
      </>
    )}
  </Surface>
)

const CollapsedNavigation = ({
  collapsed,
  isHome,
  onExpandHome,
  onExpandModule
}: {
  collapsed: boolean
  isHome: boolean
  onExpandHome: () => void
  onExpandModule: () => void
}) => {
  if (!collapsed) {
    return null
  }

  if (isHome) {
    return <HomeNavigationBubble users={headerUsers} onExpand={onExpandHome} />
  }

  return (
    <Surface
      variant="transparent"
      className="border-default-200 bg-background/90 fixed top-3 left-3 z-40 flex h-[60px] w-fit items-center rounded-full border px-2 py-1 shadow-[0_14px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl">
      <Header compact users={headerUsers} onOpenNavigation={onExpandModule} />
    </Surface>
  )
}

export { MenuMD }
