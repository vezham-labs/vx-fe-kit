import { SidebarItem } from './types'

export const longMenuItems: SidebarItem[] = [
  {
    key: 'home',
    icon: 'lucide:wallet',
    iconActive: 'solar:wallet-bold',
    href: '/',
    title: 'Home'
  },
  {
    key: 'channel',
    icon: 'lucide:library',
    iconActive: 'solar:library-bold',
    href: '/channel',
    title: 'Channels'
  },
  {
    key: 'academic',
    icon: 'lucide:settings',
    iconActive: 'solar:settings-bold',
    href: '/academic',
    title: 'Academic'
  },
  {
    key: 'operations',
    icon: 'lucide:package',
    iconActive: 'solar:box-bold',
    href: '/operations',
    title: 'Operations'
  },
  {
    key: 'reports',
    icon: 'lucide:bar-chart-2',
    iconActive: 'solar:chart-bold',
    href: '/reports',
    title: 'Reports'
  }
]
