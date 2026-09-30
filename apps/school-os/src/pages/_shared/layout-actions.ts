import type { ActionItem } from '@pages/academic/layout/types'

export const defaultLeftActions: ActionItem[] = [
  {
    key: 'back',
    label: 'Back',
    icon: 'vx:arrow-left',
    onAction: () => window.history.back()
  },
  {
    key: 'forward',
    label: 'Forward',
    icon: 'vx:arrow-right',
    onAction: () => window.history.forward()
  }
]

export const defaultRightActions: ActionItem[] = [
  {
    key: 'search',
    label: 'Search',
    icon: 'vx:search',
    kind: 'search'
  },
  {
    key: 'import',
    label: 'Import',
    icon: 'vx:upload',
    kind: 'menu'
  },
  {
    key: 'print',
    label: 'Print',
    icon: 'vx:printer',
    kind: 'menu',
    onAction: () => window.print()
  },
  {
    key: 'export',
    label: 'Export',
    icon: 'vx:download',
    kind: 'menu'
  },
  {
    key: 'refresh',
    label: 'Refresh',
    icon: 'vx:refresh',
    kind: 'refresh',
    onAction: () => window.location.reload()
  }
]
