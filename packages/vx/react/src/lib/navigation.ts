import type { ReactNode } from 'react'

import type { NavigationToolbar } from './navigation-toolbar'

export type AppNavigationItem = {
  key: string
  title: string
  href?: string
  icon?: string
  iconActive?: string
  toolbar?: NavigationToolbar
  startContent?: ReactNode
  endContent?: ReactNode
  children?: AppNavigationItem[]
  submenu?: AppNavigationItem[]
  items?: AppNavigationItem[]
  type?: 'nest'
  isSelected?: boolean
}

const getMatchLength = (pathname: string, item: AppNavigationItem): number => {
  const href = item.href
  const ownMatch =
    href &&
    (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)))
      ? href.length
      : 0
  const descendants = [
    ...(item.children ?? []),
    ...(item.submenu ?? []),
    ...(item.items ?? [])
  ]
  return descendants.reduce(
    (length, child) => Math.max(length, getMatchLength(pathname, child)),
    ownMatch
  )
}

export const getSelectedMenuKey = (
  pathname: string,
  items: AppNavigationItem[]
) => {
  let selectedKey = items[0]?.key
  let matchLength = 0
  for (const item of items) {
    const length = getMatchLength(pathname, item)
    if (length > matchLength) {
      selectedKey = item.key
      matchLength = length
    }
  }
  return selectedKey
}
