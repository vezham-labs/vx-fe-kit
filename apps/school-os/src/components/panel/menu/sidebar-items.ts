import { MenuItem } from './types'

export const items: MenuItem[] = [
  {
    key: 'home',
    icon: 'vx:home',
    iconActive: 'vx:home-filled',
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
    icon: 'vx:library',
    iconActive: 'vx:library-filled',
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
