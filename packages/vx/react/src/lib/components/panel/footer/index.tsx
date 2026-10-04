import type { ReactNode } from 'react'

import {
  Bell as BellIcon,
  MenuDots as MenuDotsIcon,
  QuestionCircle as QuestionIcon,
  Settings as SettingsIcon
} from '@vezham/icons-react'
import {
  Badge,
  Button,
  Dropdown,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react-v3'

import { useUser } from '../../../store/users/useUserStore'
import type { FooterActionsProps } from './types'
import { UserMenu } from './user-menu'

type Props = {
  label: string
  onPress?: () => void
  children: ReactNode
}

const FooterAction = ({ children, label, onPress }: Props) => {
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger className="size-5 leading-none">
        <Button
          aria-label={label}
          isIconOnly
          variant="ghost"
          size="sm"
          className="text-muted hover:text-foreground h-5 w-5"
          onPress={onPress}>
          {children}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">{label}</Tooltip.Content>
    </Tooltip>
  )
}

const CompactActions = ({
  showAI,
  showControlCenter,
  showNotifications,
  notificationCount,
  onAI,
  onControlCenterClick,
  onNotificationsClick
}: Omit<FooterActionsProps, 'user' | 'showUserInfo' | 'onUserClick'>) => {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Open footer actions"
        className="button button--ghost flex h-10 w-10 items-center justify-center rounded-lg">
        <MenuDotsIcon size={20} aria-hidden="true" />
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu aria-label="Footer actions">
          {showControlCenter ? (
            <Dropdown.Item onPress={onControlCenterClick}>
              <SettingsIcon size={20} aria-hidden="true" />
              Control Center
            </Dropdown.Item>
          ) : null}
          {showNotifications ? (
            <Dropdown.Item onPress={onNotificationsClick}>
              <BellIcon size={20} aria-hidden="true" />
              <span className="flex-1">Notifications</span>
              {notificationCount && notificationCount > 0 ? (
                <Badge
                  content={String(notificationCount)}
                  color="danger"
                  size="sm"
                />
              ) : null}
            </Dropdown.Item>
          ) : null}
          {showAI ? (
            <Dropdown.Item onPress={onAI}>
              <QuestionIcon size={20} aria-hidden="true" />
              AI
            </Dropdown.Item>
          ) : null}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

const Footer = ({
  user,
  showAI = false,
  showControlCenter = false,
  showNotifications = false,
  showUserInfo = true,
  notificationCount = 0,
  onAI,
  onControlCenterClick,
  onNotificationsClick,
  onUserClick,
  className
}: FooterActionsProps) => {
  const { clearUser } = useUser()

  return (
    <>
      <Separator className="hidden md:block" />
      <Surface
        variant="transparent"
        className={`flex items-center justify-center gap-2 md:flex-col md:gap-3 ${className ?? ''}`}>
        <div className="hidden min-[420px]:contents">
          {showAI ? (
            <FooterAction label="AI" onPress={onAI}>
              <QuestionIcon size={20} aria-hidden="true" />
            </FooterAction>
          ) : null}

          {showControlCenter ? (
            <FooterAction label="Control Center" onPress={onControlCenterClick}>
              <SettingsIcon size={20} aria-hidden="true" />
            </FooterAction>
          ) : null}

          {showNotifications ? (
            <div className="relative">
              <FooterAction
                label="Notifications"
                onPress={onNotificationsClick}>
                <BellIcon size={20} aria-hidden="true" />
              </FooterAction>
              {notificationCount > 0 ? (
                <span className="bg-danger text-danger-foreground pointer-events-none absolute -top-1 -right-1 min-w-4 rounded-full px-1 text-center text-[10px] leading-4">
                  {notificationCount}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="min-[420px]:hidden">
          <CompactActions
            showAI={showAI}
            showControlCenter={showControlCenter}
            showNotifications={showNotifications}
            notificationCount={notificationCount}
            onAI={onAI}
            onControlCenterClick={onControlCenterClick}
            onNotificationsClick={onNotificationsClick}
          />
        </div>

        {showUserInfo ? (
          <UserMenu
            user={user}
            onProfile={() => onUserClick?.(user, 'profiles')}
            onPreferences={() => onUserClick?.(user, 'account')}
            onLogout={clearUser}
          />
        ) : null}
      </Surface>
    </>
  )
}

export { Footer }
