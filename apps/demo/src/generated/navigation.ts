// Generated from vx.nav.yaml. DO NOT EDIT.
import type { AppNavigationItem } from '@vx/react'

export const navigationItems = [
  {
    "key": "home",
    "icon": "vx:home",
    "iconActive": "vx:home-filled",
    "href": "/",
    "title": "Home"
  },
  {
    "key": "pro",
    "icon": "vx:library",
    "iconActive": "vx:library-filled",
    "href": "/pro",
    "title": "Pro"
  },
  {
    "key": "sidebar",
    "icon": "vx:library",
    "iconActive": "vx:library-filled",
    "href": "/sidebar",
    "title": "Sidebar"
  }
] satisfies AppNavigationItem[]

export const getNavigationChildren = (key: string) => {
  const item = navigationItems.find(item => item.key === key)
  if (!item) {
    throw new Error('Unknown navigation key: ' + key)
  }
  return 'children' in item && Array.isArray(item.children) ? item.children : []
}
