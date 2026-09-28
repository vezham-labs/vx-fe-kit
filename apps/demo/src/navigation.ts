import type { AppNavigationItem } from '@vx/react'

export const navigationItems: AppNavigationItem[] = [
  {
    key: 'home',
    icon: 'vx:home',
    iconActive: 'vx:home-filled',
    href: '/',
    title: 'Home'
  },
  {
    key: 'pro',
    icon: 'vx:library',
    iconActive: 'vx:library-filled',
    href: '/pro',
    title: 'Pro'
  }
]
