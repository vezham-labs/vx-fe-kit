import React, { useState } from 'react'

import { Surface } from '@vezham/react-v3'

import { BottomNavbar } from '../../components/menu'
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
import type { AppNavigationItem } from '../../navigation'
import { useUser } from '../../store/users/useUserStore'

const MenuSM = ({ items }: { items: AppNavigationItem[] }) => {
  const [selectedKey, setSelectedKey] = React.useState(items[0]?.key ?? '')
  const [openSettings, setOpenSettings] = useState(false)
  const [settingsEntryPoint, setSettingsEntryPoint] = useState('account')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const { openInfoPanel } = useInfoPanel()

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
    <Surface
      variant="transparent"
      className="bg-background relative z-20 flex min-h-0 shrink-0 flex-col">
      <div className="bg-background sticky top-0 z-20 w-full shadow-md">
        <div className="flex w-full items-center justify-between px-3 py-2">
          <Header
            className="flex-shrink-0"
            users={users}
            showSearch
            showBookamarks
            showDisk
            onAvatarClick={user => console.log('Avatar clicked:', user)}
            onSearchClick={() => console.log('Search clicked')}
          />

          <Footer
            className="ml-auto flex-shrink-0"
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
            onUserClick={(_user, entryPoint = 'account') => {
              setSettingsEntryPoint(entryPoint)
              setOpenSettings(true)
            }}
          />
        </div>

        <UserInfoModal
          open={openSettings}
          onClose={() => setOpenSettings(false)}
          defaultActiveTab={settingsEntryPoint}
        />
        <ControlCenterDrawer
          isOpen={controlsOpen}
          onClose={() => setControlsOpen(false)}
        />
        <NotificationDrawer
          isOpen={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
        />
      </div>

      <InfoPanelContainer
        panels={{
          bookmarks: bookmarksPanel,
          disc: discPanel,
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
    </Surface>
  )
}

export { MenuSM }
