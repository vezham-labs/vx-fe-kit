import type { ReactNode } from 'react'

import {
  Bell as BellIcon,
  Logout2 as LogoutIcon,
  QuestionCircle as QuestionIcon,
  Settings as SettingsIcon
} from '@vezham/icons-react'
import {
  Avatar,
  Button,
  Dropdown,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react-v3'

import { useUser } from '../../../store/users/useUserStore'

import type { FooterActionsProps } from './types'

type ActionProps = {
  label: string
  onPress?: () => void
  children: ReactNode
}

const FooterAction = ({ children, label, onPress }: ActionProps) => {
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <Button
          aria-label={label}
          isIconOnly
          variant="ghost"
          className="text-muted hover:text-foreground"
          onPress={onPress}>
          {children}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">{label}</Tooltip.Content>
    </Tooltip>
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
        className={`flex items-center justify-center gap-3 md:flex-col md:gap-6 ${className ?? ''}`}>
        {showAI ? (
          <FooterAction label="AI" onPress={onAI}>
            <QuestionIcon size={24} aria-hidden="true" />
          </FooterAction>
        ) : null}

        {showControlCenter ? (
          <FooterAction label="Control Center" onPress={onControlCenterClick}>
            <SettingsIcon size={24} aria-hidden="true" />
          </FooterAction>
        ) : null}

        {showNotifications ? (
          <div className="relative">
            <FooterAction label="Notifications" onPress={onNotificationsClick}>
              <BellIcon size={24} aria-hidden="true" />
            </FooterAction>
            {notificationCount > 0 ? (
              <span className="bg-danger text-danger-foreground pointer-events-none absolute -top-1 -right-1 min-w-4 rounded-full px-1 text-center text-[10px] leading-4">
                {notificationCount}
              </span>
            ) : null}
          </div>
        ) : null}

        {showUserInfo ? (
          <Dropdown>
            <Dropdown.Trigger
              aria-label={`Open ${user.name || 'user'} menu`}
              className="button button--ghost relative flex h-10 w-10 items-center justify-center rounded-xl">
              <Avatar size="sm" className="rounded-xl">
                {user.avatar ? (
                  <Avatar.Image src={user.avatar} alt={user.name} />
                ) : null}
                <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
              </Avatar>
              <span
                aria-hidden="true"
                className={`border-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 ${
                  user.isOnline ? 'bg-success' : 'bg-muted'
                }`}
              />
            </Dropdown.Trigger>
            <Dropdown.Popover placement="right bottom">
              <Dropdown.Menu aria-label="User actions">
                <Dropdown.Item onPress={() => onUserClick?.(user)}>
                  <SettingsIcon size={18} aria-hidden="true" />
                  Preferences
                </Dropdown.Item>
                <Dropdown.Item onPress={clearUser} className="text-danger">
                  <LogoutIcon size={18} aria-hidden="true" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        ) : null}
      </Surface>
    </>
  )
}

export default Footer
