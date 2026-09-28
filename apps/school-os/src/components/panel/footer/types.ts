export interface UserInfo {
  id: string
  name: string
  avatar?: string
  isOnline?: boolean
}

export interface FooterActionsProps {
  user: UserInfo

  showAI?: boolean
  showControlCenter?: boolean
  showNotifications?: boolean
  showUserInfo?: boolean

  notificationCount?: number

  onAI?: () => void
  onControlCenterClick?: () => void
  onNotificationsClick?: () => void
  onUserClick?: (user: UserInfo) => void

  className?: string
}
