import type { AppNavigationItem } from '../../navigation'

export enum SidebarItemType {
  Nest = 'nest'
}

export type SidebarItem = Omit<AppNavigationItem, 'items' | 'type'> & {
  items?: SidebarItem[]
  type?: 'nest'
}

export interface BottomNavbarProps {
  items: SidebarItem[]
  selectedKey: string
  onSelect: (key: string) => void
  isDarkMode?: boolean
  hasMoreAction?: boolean
  bgColorClass?: string
  textColorClass?: string
  buttonTextColor?: string
}

export interface BottomDrawerMenuProps {
  items: SidebarItem[]
  selectedKey: string
  onSelect: (key: string) => void
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
  bgColorClass?: string
  buttonTextColor?: string
}

export type MenuDrawerProps = {
  items: SidebarItem[]
  selectedKey: string
  onItemSelect: (item: SidebarItem) => void
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
  buttonTextColor?: string
}
