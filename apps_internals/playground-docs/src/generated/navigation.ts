// Generated from vx.nav.yaml. DO NOT EDIT.
import type { AppNavigationItem, AppMenuItem } from '@vx/react'
import type { ControlCenterConfig } from '@vx/react/control-center'

export const navigationItems = [] satisfies AppNavigationItem[]

export const appMenu = [] satisfies AppMenuItem[]

export const controlCenter = {
  "tiles": [
    {
      "id": "appearance-lite",
      "type": "theme-toggle",
      "span": "compact"
    },
    {
      "id": "language",
      "type": "language",
      "span": "wide"
    },
    {
      "id": "appearance",
      "type": "appearance-toggle",
      "span": "wide"
    },
    {
      "id": "appearance-lite1",
      "type": "theme-toggle",
      "span": "compact"
    },
    {
      "id": "appearance-23",
      "type": "appearance-toggle",
      "span": "standard"
    },
    {
      "id": "appearance-12",
      "type": "appearance-toggle",
      "span": "full"
    },
    {
      "id": "appearance-lite2",
      "type": "theme-toggle",
      "span": "compact"
    },
    {
      "id": "appearance-lite3",
      "type": "theme-toggle",
      "span": "compact"
    },
    {
      "id": "appearance-lite4",
      "type": "theme-toggle",
      "span": "compact"
    },
    {
      "id": "appearance-lite5",
      "type": "theme-toggle",
      "span": "compact"
    }
  ]
} satisfies ControlCenterConfig

export const getNavigationChildren = (key: string) => {
  const items: readonly AppNavigationItem[] = navigationItems
  const item = items.find(item => item.key === key)
  if (!item) {
    throw new Error('Unknown navigation key: ' + key)
  }
  return 'children' in item && Array.isArray(item.children) ? item.children : []
}
