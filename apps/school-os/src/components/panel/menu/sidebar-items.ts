import { MenuItem } from './types'

export const items: MenuItem[] = [
  {
    key: 'home',
    icon: 'lucide:home',
    iconActive: 'solar:home-bold',
    href: '/',
    title: 'Home'
  },
  {
    key: 'channel',
    icon: 'lucide:library',
    iconActive: 'solar:library-bold',
    href: '/channels',
    title: 'Channels'
  },
  {
    key: 'academic',
    icon: 'lucide:library',
    iconActive: 'solar:library-bold',
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
