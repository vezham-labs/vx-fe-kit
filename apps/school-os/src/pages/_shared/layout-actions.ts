import { toast } from '@vezham/react-v3'

import { type NavigationAction, getNavigationToolbar } from '@vx/react'

import { navigationItems } from '@generated/navigation'
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

export const getLayoutRightActions = (
  pathname: string,
  prefix: string,
  pageKey: string
): ActionItem[] => {
  const toolbar = getNavigationToolbar(navigationItems, pathname)
  const bindAction = (action: NavigationAction): ActionItem => ({
    ...action,
    kind: 'menu',
    children: action.children?.map(bindAction),
    onAction:
      action.key === 'print'
        ? () => window.print()
        : action.key === 'create'
          ? () =>
              window.dispatchEvent(
                new CustomEvent(`${prefix}:${pageKey}:create`)
              )
          : undefined
  })
  const actions: ActionItem[] = []
  if (toolbar.search)
    actions.push({
      key: 'search',
      label: toolbar.search.label ?? 'Search',
      placeholder: toolbar.search.placeholder,
      icon: 'vx:search',
      kind: 'search'
    })
  actions.push(...(toolbar.menuActions?.map(bindAction) ?? []))
  if (toolbar.sync)
    actions.push({
      key: 'sync',
      label: 'Sync',
      icon: 'vx:refresh',
      kind: 'sync',
      // vx-bot/TODO: Replace this notice with server synchronization.
      onAction: () => {
        toast.info('Server sync is not implemented yet.')
      }
    })
  if (toolbar.primaryAction)
    actions.push({ ...bindAction(toolbar.primaryAction), kind: 'primary' })
  return actions
}
