import type { AppNavigationItem } from '@vx/react'

import { sidebarItems as academicItems } from '@pages/academic/layout/data'
import { operationsSidebarItems } from '@pages/operations/layout/data'
import { reportsSidebarItems } from '@pages/reports/layout/data'

export const navigationItems: AppNavigationItem[] = [
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
    title: 'Academic',
    children: academicItems
  },
  {
    key: 'operations',
    icon: 'vx:box',
    iconActive: 'vx:box-filled',
    href: '/operations',
    title: 'Operations',
    children: operationsSidebarItems
  },
  {
    key: 'reports',
    icon: 'vx:chart',
    iconActive: 'vx:chart-filled',
    href: '/reports',
    title: 'Reports',
    children: reportsSidebarItems
  }
]
