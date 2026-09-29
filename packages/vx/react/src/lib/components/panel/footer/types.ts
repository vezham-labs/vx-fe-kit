export interface UserInfo {
  id: string
  name: string
  avatar?: string
  isOnline?: boolean
}

export type UserStatus = 'active' | 'away' | 'idle' | 'busy' | 'dnd'

export interface UserStatusOption {
  id: UserStatus
  label: string
  icon: string
  color?: string
}

export interface SuggestedStatusOption {
  id: string
  label: string
  emoji: string
}

export interface StatusTimingOption {
  id: string
  label: string
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
