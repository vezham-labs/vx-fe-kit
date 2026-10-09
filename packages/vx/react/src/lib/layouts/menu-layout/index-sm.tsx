import React, { useState } from 'react'

import { Surface } from '@vezham/react-v3'

import { BottomNavbar } from '../../components/menu'
import { Footer } from '../../components/panel/footer'
import { aiPanel } from '../../components/panel/footer/ai'
import { NotificationDrawer } from '../../components/panel/footer/notification-center'
import { UserInfoModal } from '../../components/panel/footer/preferences/modal'
import { Header } from '../../components/panel/header'
import { bookmarksPanel } from '../../components/panel/header/bookmarks'
import { storagePanel } from '../../components/panel/header/storage'
import {
  InfoPanelContainer,
  useInfoPanel
} from '../../components/panel/info-panel'
import { useWorkspaceNavigation } from '../../components/workspace-navigation'
import { useUser } from '../../store/users/useUserStore'
import type { MenuLayoutProps } from './index'

const MenuSM = ({ items, controlCenter }: MenuLayoutProps) => {
  const [selectedKey, setSelectedKey] = React.useState(items[0]?.key ?? '')
  const [openSettings, setOpenSettings] = useState(false)
  const [settingsEntryPoint, setSettingsEntryPoint] = useState('account')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { openInfoPanel } = useInfoPanel()
  const { mobileSidebar } = useWorkspaceNavigation()

  const handleItemSelect = (key: string) => {
    setSelectedKey(key)
  }

  const users = {
    id: '1',
    name: 'Slack',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
  }

  const { user } = useUser()
  return (
    <>
      <div className="pointer-events-none fixed top-3 right-3 left-3 z-40 flex items-center justify-between gap-2">
        <Surface
          variant="transparent"
          role="group"
          aria-label="Mobile navigation controls"
          className="border-default-200 bg-background/90 pointer-events-auto flex h-12 shrink-0 items-center rounded-full border px-2 shadow-[0_14px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <Header
            compact
            className="flex-shrink-0"
            users={users}
            showBookamarks
            showStorage
            isSidebarOpen={mobileSidebar?.isOpen}
            onToggleSidebar={mobileSidebar?.onToggle}
          />
        </Surface>

        <Surface
          variant="transparent"
          role="group"
          aria-label="Mobile account actions"
          className="border-default-200 bg-background/90 pointer-events-auto flex h-12 shrink-0 items-center rounded-full border px-2 shadow-[0_14px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl">
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
            controlCenter={controlCenter}
            showNotifications
            showUserInfo
            onAI={() => openInfoPanel('ai')}
            onNotificationsClick={() => setNotificationsOpen(true)}
            onUserClick={(_user, entryPoint = 'account') => {
              setSettingsEntryPoint(entryPoint)
              setOpenSettings(true)
            }}
          />
        </Surface>
      </div>

      <UserInfoModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        defaultActiveTab={settingsEntryPoint}
      />
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <InfoPanelContainer
        panels={{
          bookmarks: bookmarksPanel,
          storage: storagePanel,
          ai: aiPanel
        }}
      />

      <div className="shrink-0">
        <BottomNavbar
          items={items}
          selectedKey={selectedKey}
          onSelect={handleItemSelect}
        />
      </div>
    </>
  )
}

export { MenuSM }
