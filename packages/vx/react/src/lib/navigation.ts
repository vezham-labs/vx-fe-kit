import type { ReactNode } from 'react'

export type AppNavigationItem = {
  key: string
  title: string
  href?: string
  icon?: string
  iconActive?: string
  startContent?: ReactNode
  endContent?: ReactNode
  children?: AppNavigationItem[]
  submenu?: AppNavigationItem[]
  items?: AppNavigationItem[]
  type?: 'nest'
  isSelected?: boolean
}
