import { useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Surface } from '@vezham/react-v3'

import { useCommand } from '../../components/command'
import Footer from '../../components/panel/footer'
import { aiPanel } from '../../components/panel/footer/ai'
import { ControlCenterDrawer } from '../../components/panel/footer/control-center'
import { NotificationDrawer } from '../../components/panel/footer/notification-center'
import UserInfoModal from '../../components/panel/footer/preferences/modal'
import Header from '../../components/panel/header'
import { bookmarksPanel } from '../../components/panel/header/bookmarks'
import { discPanel } from '../../components/panel/header/disc'
import {
  InfoPanelContainer,
  useInfoPanel
} from '../../components/panel/info-panel'
import { Menu } from '../../components/panel/menu'
import { items } from '../../components/panel/menu/sidebar-items'
import { useWorkspaceNavigation } from '../../components/workspace-navigation'
import { useUser } from '../../store/users/useUserStore'
import HomeNavigationBubble from './home-navigation-bubble'

export default function MenuMD() {
  const [openSettings, setOpenSettings] = useState(false)
  const location = useLocation()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const { openInfoPanel, closeInfoPanel } = useInfoPanel()
  const { closeCommand } = useCommand()
  const { expandNavigation, isNavigationCollapsed: isWorkspaceCollapsed } =
    useWorkspaceNavigation()
  // Home has its own preference; toggling it must not change module sidebars.
  const [isHomeCollapsed, setIsHomeCollapsed] = useState(false)
  const isHome = location.pathname === '/'
  const isNavigationCollapsed = isHome ? isHomeCollapsed : isWorkspaceCollapsed
  // Keep Home's content gutter stable even when only the floating bubble is visible.
  const navigationWidth = isHome || !isNavigationCollapsed ? 'w-[106px]' : 'w-0'

  const collapseHomeNavigation = () => {
    setIsHomeCollapsed(true)
    closeInfoPanel()
    closeCommand()
    setOpenSettings(false)
    setNotificationsOpen(false)
    setControlsOpen(false)
  }

  const selectedKey = getSelectedMenuKey(location.pathname)

  const users = {
    id: '1',
    name: 'Slack',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
  }

  const { user } = useUser()

  useEffect(() => {
    if (!isNavigationCollapsed) {
      return
    }

    setOpenSettings(false)
    setNotificationsOpen(false)
    setControlsOpen(false)
  }, [isNavigationCollapsed])

  return (
    <>
      <Surface
        variant="transparent"
        className={`border-default-300 sticky top-0 left-0 z-[10] flex h-[100dvh] shrink-0 flex-col overflow-hidden transition-[width,padding,gap] duration-300 ease-out ${navigationWidth} ${
          isNavigationCollapsed ? 'border-0 p-0' : 'gap-6 px-4 pt-4 pb-6'
        }`}
        data-vx="menu-layout">
        {!isNavigationCollapsed && (
          <>
            <Header
              users={users}
              showSearch
              showBookamarks
              showDisk
              onCollapseNavigation={isHome ? collapseHomeNavigation : undefined}
            />

            <Menu collapsed={false} items={items} selectedKey={selectedKey} />

            <Footer
              user={{
                id: user?.id ?? '',
                name: user
                  ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
                  : '',
                avatar: user?.avatar,
                isOnline: user?.isOnline
              }}
              showAI
              showControlCenter
              showNotifications
              showUserInfo
              onAI={() => openInfoPanel('ai')}
              onControlCenterClick={() => setControlsOpen(true)}
              onNotificationsClick={() => setNotificationsOpen(true)}
              onUserClick={() => setOpenSettings(true)}
            />
          </>
        )}
      </Surface>
      {isNavigationCollapsed && isHome && (
        <HomeNavigationBubble
          users={users}
          onExpand={() => setIsHomeCollapsed(false)}
        />
      )}
      {isNavigationCollapsed && !isHome && (
        <Surface
          variant="transparent"
          className="border-default-200 bg-background/90 fixed top-3 left-3 z-40 flex h-[60px] w-fit items-center rounded-full border px-2 py-1 shadow-[0_14px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <Header compact users={users} onOpenNavigation={expandNavigation} />
        </Surface>
      )}
      <UserInfoModal
        open={openSettings && !isNavigationCollapsed}
        onClose={() => setOpenSettings(false)}
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

function getSelectedMenuKey(pathname: string) {
  const activeItem = items
    .flatMap(item => [item, ...(item.submenu ?? [])])
    .filter(
      item =>
        item.href &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`))
    )
    .sort((a, b) => (b.href?.length ?? 0) - (a.href?.length ?? 0))[0]

  const parentItem = items.find(
    item =>
      item.key === activeItem?.key ||
      item.submenu?.some(subItem => subItem.key === activeItem?.key)
  )

  return parentItem?.key ?? items[0]?.key
}
