import { SidebarItem } from './types'

export const longMenuItems: SidebarItem[] = [
  {
    key: 'home',
    icon: 'vx:wallet',
    iconActive: 'vx:wallet-filled',
    href: '/',
    title: 'Home'
  },
  {
    key: 'channel',
    icon: 'vx:library',
    iconActive: 'vx:library-filled',
    href: '/channels',
    title: 'Channels'
  },
  {
    key: 'academic',
    icon: 'vx:settings',
    iconActive: 'vx:settings-filled',
    href: '/academic',
    title: 'Academic'
  },
  {
    key: 'operations',
    icon: 'vx:box',
    iconActive: 'vx:box-filled',
    href: '/operations',
    title: 'Operations'
  },
  {
    key: 'reports',
    icon: 'vx:chart',
    iconActive: 'vx:chart-filled',
    href: '/reports',
    title: 'Reports'
  }
]
